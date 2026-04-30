import { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MonitorUp,
  Copy,
  Users,
  ShieldCheck,
  Loader2,
  XCircle,
  FileText,
  Plus,
} from "lucide-react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useConsultationStore } from "../../stores/consultationStore";
import PrescriptionModal from "../../components/PrescriptionModal";
const SOCKET_URL = "http://localhost:8000";

const iceServers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const ConsultationRoom = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { room, loading, error, getRoomByCode, closeRoom } =
    useConsultationStore();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  const [prescriptionOpen, setPrescriptionOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [remoteJoined, setRemoteJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [status, setStatus] = useState("Preparing consultation room...");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const start = async () => {
      try {
        const roomData = await getRoomByCode(roomCode);
        await setupMedia();
        setupSocket(roomData);
      } catch (err) {
        setStatus(err.message);
      }
    };

    start();

    return () => {
      cleanup();
    };
  }, [roomCode]);

  const setupMedia = async () => {
    setStatus("Requesting camera and microphone permission...");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    setStatus("Camera and microphone are ready.");
  };

  const createPeer = () => {
    const peer = new RTCPeerConnection(iceServers);

    localStreamRef.current?.getTracks().forEach((track) => {
      peer.addTrack(track, localStreamRef.current);
    });

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit("webrtc-ice-candidate", {
          roomCode,
          candidate: event.candidate,
        });
      }
    };

    peer.onconnectionstatechange = () => {
      setStatus(`Connection status: ${peer.connectionState}`);

      if (peer.connectionState === "connected") {
        setConnected(true);
        setStatus("Live consultation connected.");
      }
    };

    peerRef.current = peer;
    return peer;
  };

  const setupSocket = (roomData) => {
    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      setStatus("Connected to consultation server.");

      socketRef.current.emit("join-room", {
        roomCode: roomData.roomCode,
        userId: user?.id,
      });
    });

    socketRef.current.on("user-joined", async () => {
      setRemoteJoined(true);
      setStatus("Other participant joined. Starting secure video call...");

      const peer = createPeer();
      const offer = await peer.createOffer();

      await peer.setLocalDescription(offer);

      socketRef.current.emit("webrtc-offer", {
        roomCode,
        offer,
      });
    });

    socketRef.current.on("webrtc-offer", async ({ offer }) => {
      setRemoteJoined(true);
      setStatus("Receiving video call request...");

      const peer = createPeer();

      await peer.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      socketRef.current.emit("webrtc-answer", {
        roomCode,
        answer,
      });
    });

    socketRef.current.on("webrtc-answer", async ({ answer }) => {
      if (!peerRef.current) return;

      await peerRef.current.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
    });

    socketRef.current.on("webrtc-ice-candidate", async ({ candidate }) => {
      try {
        if (peerRef.current && candidate) {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (err) {
        console.error("ICE candidate error:", err);
      }
    });

    socketRef.current.on("user-left", () => {
      setRemoteJoined(false);
      setConnected(false);
      setStatus("Other participant left the consultation.");
    });
  };

  const toggleMic = () => {
    const audioTrack = localStreamRef.current?.getAudioTracks()?.[0];

    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()?.[0];

    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCameraOn(videoTrack.enabled);
    }
  };

  const shareScreen = async () => {
    try {
      if (screenSharing) {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        const cameraTrack = cameraStream.getVideoTracks()[0];
        replaceVideoTrack(cameraTrack);

        localStreamRef.current.getVideoTracks()[0]?.stop();
        localStreamRef.current = cameraStream;
        localVideoRef.current.srcObject = cameraStream;

        setScreenSharing(false);
        return;
      }

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      const screenTrack = screenStream.getVideoTracks()[0];

      replaceVideoTrack(screenTrack);

      const mixedStream = new MediaStream([
        screenTrack,
        ...localStreamRef.current.getAudioTracks(),
      ]);

      localVideoRef.current.srcObject = mixedStream;
      setScreenSharing(true);

      screenTrack.onended = async () => {
        setScreenSharing(false);
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        const cameraTrack = cameraStream.getVideoTracks()[0];
        replaceVideoTrack(cameraTrack);
        localStreamRef.current = cameraStream;
        localVideoRef.current.srcObject = cameraStream;
      };
    } catch (err) {
      setStatus("Screen sharing cancelled or failed.");
    }
  };

  const replaceVideoTrack = (newTrack) => {
    const sender = peerRef.current
      ?.getSenders()
      ?.find((s) => s.track?.kind === "video");

    if (sender) {
      sender.replaceTrack(newTrack);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const endCall = async () => {
    if (user?.role === "ADMIN" || user?.role === "DOCTOR") {
      try {
        await closeRoom(room?.appointmentId);
      } catch {}
    }

    cleanup();
    navigate("/dashboard/appointments");
  };

  const cleanup = () => {
    socketRef.current?.emit("leave-room", { roomCode });
    socketRef.current?.disconnect();

    peerRef.current?.close();

    localStreamRef.current?.getTracks()?.forEach((track) => track.stop());

    socketRef.current = null;
    peerRef.current = null;
    localStreamRef.current = null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={42} />
          <p className="text-lg font-bold">Loading consultation room...</p>
        </div>
      </div>
    );
  }

  if (error && !room) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center">
          <XCircle className="mx-auto text-red-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900">Room unavailable</h2>
          <p className="text-gray-500 mt-2">{error}</p>
          <button
            onClick={() => navigate("/dashboard/appointments")}
            className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="h-20 border-b border-white/10 px-4 md:px-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold">
            Online Consultation
          </h1>
          <p className="text-sm text-slate-400">{status}</p>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-2xl font-bold"
          >
            <Copy size={17} />
            {copied ? "Copied" : "Copy Link"}
          </button>

          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-300 px-4 py-2 rounded-2xl font-bold">
            <ShieldCheck size={17} />
            Secure Room
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <section className="space-y-5">
            <div className="relative bg-black rounded-[2rem] overflow-hidden border border-white/10 min-h-[420px] md:min-h-[560px]">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full min-h-[420px] md:min-h-[560px] object-cover bg-black"
              />

              {!remoteJoined && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                  <div className="text-center">
                    <Users className="mx-auto text-teal-400 mb-4" size={56} />
                    <h2 className="text-2xl font-bold">
                      Waiting for the other participant
                    </h2>
                    <p className="text-slate-400 mt-2">
                      The doctor or patient will join here at the scheduled
                      time.
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute right-4 bottom-4 w-40 md:w-56 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-32 md:h-40 object-cover bg-slate-800"
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/10 rounded-[2rem] p-4 flex flex-wrap justify-center gap-3">
              <ControlButton
                active={micOn}
                onClick={toggleMic}
                iconOn={Mic}
                iconOff={MicOff}
                label={micOn ? "Mute" : "Unmute"}
              />

              <ControlButton
                active={cameraOn}
                onClick={toggleCamera}
                iconOn={Video}
                iconOff={VideoOff}
                label={cameraOn ? "Camera Off" : "Camera On"}
              />

              <button
                onClick={shareScreen}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition ${
                  screenSharing
                    ? "bg-cyan-500 text-white"
                    : "bg-white/10 hover:bg-white/15"
                }`}
              >
                <MonitorUp size={18} />
                {screenSharing ? "Stop Share" : "Share Screen"}
              </button>
              {user?.role === "DOCTOR" && (
                <button
                  onClick={() => setPrescriptionOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <FileText size={18} />
                  New Prescription
                </button>
              )}
              <button
                onClick={copyLink}
                className="md:hidden flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-white/10 hover:bg-white/15"
              >
                <Copy size={18} />
                Copy
              </button>

              <button
                onClick={endCall}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-red-600 hover:bg-red-700 text-white"
              >
                <PhoneOff size={18} />
                End Call
              </button>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="bg-white/10 border border-white/10 rounded-[2rem] p-6">
              <h2 className="text-lg font-bold mb-4">Room Details</h2>

              <Info label="Room Code" value={room?.roomCode} />
              <Info label="Your Role" value={user?.role} />
              <Info
                label="Start Time"
                value={
                  room?.startsAt
                    ? new Date(room.startsAt).toLocaleString()
                    : "N/A"
                }
              />
              <Info
                label="Expires At"
                value={
                  room?.expiresAt
                    ? new Date(room.expiresAt).toLocaleString()
                    : "N/A"
                }
              />
              <Info
                label="Status"
                value={room?.isActive ? "Active" : "Closed"}
              />
            </div>

            <div className="bg-white/10 border border-white/10 rounded-[2rem] p-6">
              <h2 className="text-lg font-bold mb-3">Connection</h2>

              <div
                className={`px-4 py-3 rounded-2xl font-bold ${
                  connected
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {connected ? "Connected" : "Waiting / Connecting"}
              </div>

              <p className="text-sm text-slate-400 mt-4 leading-6">
                Keep this page open during consultation. Use a stable internet
                connection and allow camera/microphone permissions.
              </p>
            </div>
          </aside>
        </div>
      </main>
      {user?.role === "DOCTOR" && room?.appointment && (
        <PrescriptionModal
          isOpen={prescriptionOpen}
          onClose={() => setPrescriptionOpen(false)}
          appointment={room.appointment}
          onSuccess={() => {
            setPrescriptionOpen(false);
            alert("Prescription created successfully");
          }}
        />
      )}
    </div>
  );
};

const ControlButton = ({
  active,
  onClick,
  iconOn: IconOn,
  iconOff: IconOff,
  label,
}) => {
  const Icon = active ? IconOn : IconOff;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition ${
        active ? "bg-white/10 hover:bg-white/15" : "bg-red-600 text-white"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
};

const Info = ({ label, value }) => (
  <div className="py-3 border-b border-white/10 last:border-b-0">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="font-bold break-all">{value || "N/A"}</p>
  </div>
);

export default ConsultationRoom;
