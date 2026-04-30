import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Mail,
  MessageSquare,
  Search,
  RefreshCw,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  UserRound,
  CalendarDays,
} from "lucide-react";

import { useAuthStore } from "../../stores/authStore";
import { useNotificationStore } from "../../stores/notificationStore";

const statusStyle = {
  PENDING: "bg-yellow-50 text-yellow-700",
  SENT: "bg-emerald-50 text-emerald-600",
  FAILED: "bg-red-50 text-red-600",
};

const Notifications = () => {
  const { user } = useAuthStore();

  const {
    notifications,
    loading,
    error,
    getNotifications,
    createNotification,
    markAsSent,
    markAsFailed,
  } = useNotificationStore();

  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const text = `${item.subject || ""} ${item.message || ""} ${
        item.channel || ""
      } ${item.status || ""}`;

      return text.toLowerCase().includes(search.toLowerCase());
    });
  }, [notifications, search]);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 2500);
  };

  const handleMarkSent = async (id) => {
    await markAsSent(id);
    await getNotifications();
    showSuccess("Notification marked as sent");
  };

  const handleMarkFailed = async (id) => {
    await markAsFailed(id);
    await getNotifications();
    showSuccess("Notification marked as failed");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-500 p-6 md:p-8 text-white shadow-xl shadow-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Notifications
            </h1>
            <p className="text-teal-50 mt-2">
              {user?.role === "ADMIN"
                ? "Manage system email and SMS notifications."
                : "View your appointment and prescription notifications."}
            </p>
          </div>

          <div className="flex gap-3">
            {user?.role === "ADMIN" && (
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-white text-teal-700 px-5 py-3 rounded-2xl font-bold hover:bg-teal-50 transition"
              >
                <Plus size={17} />
                New Notification
              </button>
            )}

            <button
              onClick={getNotifications}
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

      <div className="grid md:grid-cols-3 gap-5">
        <StatCard
          label="Total"
          value={notifications.length}
          icon={Bell}
          color="text-teal-600"
        />
        <StatCard
          label="Sent"
          value={notifications.filter((n) => n.status === "SENT").length}
          icon={CheckCircle2}
          color="text-emerald-600"
        />
        <StatCard
          label="Failed"
          value={notifications.filter((n) => n.status === "FAILED").length}
          icon={XCircle}
          color="text-red-600"
        />
      </div>

      <div className="bg-white rounded-[2rem] border shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Notification List
            </h2>
            <p className="text-sm text-gray-500">
              Showing {filteredNotifications.length} notifications
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
              placeholder="Search notification..."
              className="w-full pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        {loading ? (
          <div className="xl:col-span-2 bg-white rounded-3xl p-10 text-center text-gray-500">
            Loading notifications...
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="xl:col-span-2 bg-white rounded-3xl p-10 text-center text-gray-500">
            No notification found.
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              isAdmin={user?.role === "ADMIN"}
              onSent={handleMarkSent}
              onFailed={handleMarkFailed}
            />
          ))
        )}
      </div>

      {modalOpen && (
        <CreateNotificationModal
          onClose={() => setModalOpen(false)}
          onCreate={async (payload) => {
            await createNotification(payload);
            await getNotifications();
            setModalOpen(false);
            showSuccess("Notification created successfully");
          }}
          loading={loading}
        />
      )}
    </div>
  );
};

const NotificationCard = ({ item, isAdmin, onSent, onFailed }) => {
  const ChannelIcon = item.channel === "SMS" ? MessageSquare : Mail;
  const StatusIcon =
    item.status === "SENT"
      ? CheckCircle2
      : item.status === "FAILED"
        ? XCircle
        : Clock;

  return (
    <div className="bg-white border rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-teal-100 transition">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold">
              <ChannelIcon size={14} />
              {item.channel}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                statusStyle[item.status] || "bg-gray-50 text-gray-600"
              }`}
            >
              <StatusIcon size={14} />
              {item.status}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 mt-4">
            {item.subject || "No subject"}
          </h3>

          <p className="text-gray-600 mt-2 leading-7 whitespace-pre-line">
            {item.message}
          </p>
        </div>

        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => onSent(item.id)}
              className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100"
            >
              Sent
            </button>

            <button
              onClick={() => onFailed(item.id)}
              className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100"
            >
              Failed
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <InfoBox icon={UserRound} label="User ID" value={item.userId} />

        <InfoBox
          icon={CalendarDays}
          label="Appointment"
          value={item.appointmentId ? `#${item.appointmentId}` : "N/A"}
          sub={
            item.appointment?.slot
              ? `${new Date(item.appointment.slot.slotDate).toDateString()} | ${
                  item.appointment.slot.startTime
                } - ${item.appointment.slot.endTime}`
              : ""
          }
        />
      </div>
    </div>
  );
};

const CreateNotificationModal = ({ onClose, onCreate, loading }) => {
  const [form, setForm] = useState({
    userId: "",
    appointmentId: "",
    channel: "EMAIL",
    subject: "",
    message: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = {
      userId: Number(form.userId),
      channel: form.channel,
      subject: form.subject,
      message: form.message,
    };

    if (form.appointmentId) {
      payload.appointmentId = Number(form.appointmentId);
    }

    onCreate(payload);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white p-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Create Notification</h2>
            <p className="text-teal-50">
              Admin can create manual email or SMS notification.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submitHandler} className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="User ID"
              name="userId"
              type="number"
              value={form.userId}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, userId: e.target.value }))
              }
              required
            />

            <Input
              label="Appointment ID Optional"
              name="appointmentId"
              type="number"
              value={form.appointmentId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  appointmentId: e.target.value,
                }))
              }
            />
          </div>

          <label className="block">
            <span className="text-sm font-bold text-gray-700">Channel</span>

            <select
              value={form.channel}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, channel: e.target.value }))
              }
              className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="EMAIL">EMAIL</option>
              <option value="SMS">SMS</option>
            </select>
          </label>

          <Input
            label="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, subject: e.target.value }))
            }
          />

          <label className="block">
            <span className="text-sm font-bold text-gray-700">Message</span>
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={5}
              required
              className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              placeholder="Write notification message..."
            />
          </label>

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700 disabled:opacity-60"
          >
            <Send size={18} />
            {loading ? "Creating..." : "Create Notification"}
          </button>
        </form>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white rounded-[2rem] border p-6 shadow-sm">
    <div
      className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color}`}
    >
      <Icon size={24} />
    </div>

    <p className="text-sm text-gray-500 mt-4">{label}</p>
    <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{value}</h3>
  </div>
);

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

const Input = ({ label, ...props }) => (
  <label className="block">
    <span className="text-sm font-bold text-gray-700">{label}</span>
    <input
      {...props}
      className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
    />
  </label>
);

export default Notifications;
