import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  UserRound,
  Stethoscope,
  Search,
  RefreshCw,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Plus,
  Video,
} from "lucide-react";

import { useAuthStore } from "../../stores/authStore";
import { useAppointmentStore } from "../../stores/appointmentStore";
import { useSlotStore } from "../../stores/slotStore";
import AppointmentBookingModal from "../../components/AppointmentBookingModal";

const statusOptions = ["APPROVED", "DISAPPROVED", "COMPLETED", "CANCELLED"];

const Appointments = () => {
  const { user } = useAuthStore();

  const {
    appointments,
    loading,
    error,
    getAppointments,
    updateAppointmentStatus,
    rescheduleAppointment,
  } = useAppointmentStore();

  const { slots, getSlots } = useSlotStore();

  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    newSlotId: "",
    reason: "",
  });

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  useEffect(() => {
    if (rescheduleTarget && rescheduleForm.date) {
      getSlots({
        doctorId: rescheduleTarget.doctorId,
        date: rescheduleForm.date,
        status: "AVAILABLE",
      });
    }
  }, [rescheduleTarget, rescheduleForm.date, getSlots]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const text = `
        ${item.patient?.user?.fullName || ""}
        ${item.doctor?.user?.fullName || ""}
        ${item.status || ""}
        ${item.reason || ""}
      `;

      return text.toLowerCase().includes(search.toLowerCase());
    });
  }, [appointments, search]);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 2500);
  };

  const handleStatus = async (id, status) => {
    await updateAppointmentStatus(id, status);
    await getAppointments();
    showSuccess(`Appointment ${status.toLowerCase()} successfully`);
  };

  const openReschedule = (appointment) => {
    setRescheduleTarget(appointment);
    setRescheduleForm({
      date: "",
      newSlotId: "",
      reason: "",
    });
  };

  const submitReschedule = async (e) => {
    e.preventDefault();

    await rescheduleAppointment(rescheduleTarget.id, {
      newSlotId: Number(rescheduleForm.newSlotId),
      reason: rescheduleForm.reason,
    });

    await getAppointments();
    setRescheduleTarget(null);
    showSuccess("Appointment rescheduled successfully");
  };

  const canManageStatus = user?.role === "ADMIN";
  const canReschedule = ["ADMIN", "DOCTOR"].includes(user?.role);
  const canBook = user?.role === "PATIENT";

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-500 p-6 md:p-8 text-white shadow-xl shadow-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              {user?.role === "PATIENT"
                ? "My Appointments"
                : user?.role === "DOCTOR"
                  ? "Doctor Appointments"
                  : "All Appointments"}
            </h1>
            <p className="text-teal-50 mt-2">
              Manage appointment requests, approvals, schedules and online
              consultation rooms.
            </p>
          </div>

          <div className="flex gap-3">
            {canBook && (
              <button
                onClick={() => setBookingOpen(true)}
                className="flex items-center justify-center gap-2 bg-white text-teal-700 px-5 py-3 rounded-2xl font-bold hover:bg-teal-50 transition"
              >
                <Plus size={17} />
                Book Appointment
              </button>
            )}

            <button
              onClick={getAppointments}
              className="flex items-center justify-center gap-2 bg-white/20 text-white px-5 py-3 rounded-2xl font-bold hover:bg-white/30 transition"
            >
              <RefreshCw size={17} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-5 py-4 rounded-2xl">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl">
          {error}
        </div>
      )}

      <div className="bg-white rounded-[2rem] border shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Appointment List
            </h2>
            <p className="text-sm text-gray-500">
              Total appointments: {filteredAppointments.length}
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search appointment..."
              className="w-full pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        {loading ? (
          <div className="xl:col-span-2 bg-white rounded-3xl p-10 text-center text-gray-500">
            Loading appointments...
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="xl:col-span-2 bg-white rounded-3xl p-10 text-center text-gray-500">
            No appointment found.
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              user={user}
              canManageStatus={canManageStatus}
              canReschedule={canReschedule}
              onStatus={handleStatus}
              onReschedule={openReschedule}
            />
          ))
        )}
      </div>

      <AppointmentBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onSuccess={getAppointments}
      />

      {rescheduleTarget && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white p-6">
              <h2 className="text-2xl font-extrabold">
                Reschedule Appointment
              </h2>
              <p className="text-teal-50">
                Select a new available slot for this appointment.
              </p>
            </div>

            <form onSubmit={submitReschedule} className="p-6 space-y-5">
              <label className="block">
                <span className="text-sm font-bold text-gray-700">
                  New Date
                </span>
                <input
                  type="date"
                  value={rescheduleForm.date}
                  onChange={(e) =>
                    setRescheduleForm((prev) => ({
                      ...prev,
                      date: e.target.value,
                      newSlotId: "",
                    }))
                  }
                  required
                  className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-gray-700">
                  New Slot
                </span>

                <select
                  value={rescheduleForm.newSlotId}
                  onChange={(e) =>
                    setRescheduleForm((prev) => ({
                      ...prev,
                      newSlotId: e.target.value,
                    }))
                  }
                  required
                  className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select available slot</option>
                  {slots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.startTime} - {slot.endTime}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-gray-700">Reason</span>
                <textarea
                  value={rescheduleForm.reason}
                  onChange={(e) =>
                    setRescheduleForm((prev) => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                  rows={3}
                  className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  placeholder="Reason for reschedule"
                />
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRescheduleTarget(null)}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-2xl font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button className="flex-1 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700">
                  Save Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AppointmentCard = ({
  appointment,
  user,
  canManageStatus,
  canReschedule,
  onStatus,
  onReschedule,
}) => {
  const slot = appointment.slot;

  return (
    <div className="bg-white border rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-teal-100 transition">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <StatusBadge status={appointment.status} />

          <h3 className="text-xl font-extrabold text-gray-900 mt-3">
            Appointment #{appointment.id}
          </h3>

          <p className="text-gray-500 mt-1">
            {appointment.reason || "No reason provided"}
          </p>
        </div>

        {appointment.consultationRoom?.meetingLink && (
          <a
            href={`/consultation/${appointment.consultationRoom.roomCode}`}
            className="inline-flex items-center justify-center gap-2 bg-cyan-600 text-white px-4 py-2.5 rounded-2xl font-bold hover:bg-cyan-700"
          >
            Join
          </a>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {user?.role !== "PATIENT" && (
          <InfoBox
            icon={UserRound}
            label="Patient"
            value={appointment.patient?.user?.fullName}
            sub={appointment.patient?.user?.phone}
          />
        )}

        {user?.role !== "DOCTOR" && (
          <InfoBox
            icon={Stethoscope}
            label="Doctor"
            value={`Dr. ${appointment.doctor?.user?.fullName}`}
            sub={appointment.doctor?.specialization}
          />
        )}

        <InfoBox
          icon={CalendarDays}
          label="Date"
          value={
            slot?.slotDate ? new Date(slot.slotDate).toDateString() : "N/A"
          }
        />

        <InfoBox
          icon={Clock}
          label="Time"
          value={slot ? `${slot.startTime} - ${slot.endTime}` : "N/A"}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {canManageStatus &&
          statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => onStatus(appointment.id, status)}
              className="px-4 py-2 rounded-xl border text-sm font-bold hover:bg-teal-50 hover:text-teal-700"
            >
              {status}
            </button>
          ))}

        {canReschedule && appointment.status !== "CANCELLED" && (
          <button
            onClick={() => onReschedule(appointment)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-orange-600 font-bold hover:bg-orange-100"
          >
            <RotateCcw size={16} />
            Reschedule
          </button>
        )}
      </div>
    </div>
  );
};

const InfoBox = ({ icon: Icon, label, value, sub }) => (
  <div className="bg-slate-50 rounded-2xl p-4 border">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-bold text-gray-900">{value || "N/A"}</p>
        {sub && <p className="text-xs text-gray-500">{sub}</p>}
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: "bg-yellow-50 text-yellow-700",
    APPROVED: "bg-emerald-50 text-emerald-600",
    DISAPPROVED: "bg-red-50 text-red-600",
    RESCHEDULED: "bg-orange-50 text-orange-600",
    COMPLETED: "bg-cyan-50 text-cyan-600",
    CANCELLED: "bg-gray-100 text-gray-600",
  };

  const Icon =
    status === "APPROVED" || status === "COMPLETED"
      ? CheckCircle2
      : status === "DISAPPROVED" || status === "CANCELLED"
        ? XCircle
        : CalendarDays;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
        styles[status] || "bg-gray-50 text-gray-600"
      }`}
    >
      <Icon size={14} />
      {status}
    </span>
  );
};

export default Appointments;
