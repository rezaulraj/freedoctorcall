import { useEffect, useState } from "react";
import {
  Clock,
  Plus,
  Save,
  Trash2,
  Pencil,
  X,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Zap,
  CalendarDays,
} from "lucide-react";

import { useScheduleStore } from "../../stores/scheduleStore";
import { useAuthStore } from "../../stores/authStore";
import { useDoctorStore } from "../../stores/doctorStore";

const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];

const DoctorSchedules = () => {
  const { user } = useAuthStore();
  const { doctors, getAllDoctors } = useDoctorStore();

  const {
    schedules,
    loading,
    error,
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    generateSlots,
  } = useScheduleStore();

  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    doctorId: "",
    dayOfWeek: "MONDAY",
    startTime: "10:00",
    endTime: "18:00",
    slotDurationMinutes: 30,
    isActive: true,
  });

  const [generateModal, setGenerateModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [generateForm, setGenerateForm] = useState({
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    getSchedules();

    if (user?.role === "ADMIN") {
      getAllDoctors();
    }
  }, [getSchedules, getAllDoctors, user?.role]);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 2500);
  };

  const resetForm = () => {
    setEditing(null);
    setForm({
      doctorId: "",
      dayOfWeek: "MONDAY",
      startTime: "10:00",
      endTime: "18:00",
      slotDurationMinutes: 30,
      isActive: true,
    });
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      dayOfWeek: form.dayOfWeek,
      startTime: form.startTime,
      endTime: form.endTime,
      slotDurationMinutes: Number(form.slotDurationMinutes),
      isActive: form.isActive,
    };

    if (user?.role === "ADMIN") {
      payload.doctorId = Number(form.doctorId);
    }

    if (editing) {
      await updateSchedule(editing.id, payload);
      showSuccess("Schedule updated successfully");
    } else {
      await createSchedule(payload);
      showSuccess("Schedule created successfully");
    }

    await getSchedules();
    resetForm();
  };

  const handleEdit = (schedule) => {
    setEditing(schedule);

    setForm({
      doctorId: schedule.doctorId || "",
      dayOfWeek: schedule.dayOfWeek || "MONDAY",
      startTime: schedule.startTime || "10:00",
      endTime: schedule.endTime || "18:00",
      slotDurationMinutes: schedule.slotDurationMinutes || 30,
      isActive: schedule.isActive ?? true,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;

    await deleteSchedule(id);
    await getSchedules();
    showSuccess("Schedule deleted successfully");
  };

  const openGenerateModal = (schedule) => {
    setSelectedSchedule(schedule);
    setGenerateForm({
      fromDate: "",
      toDate: "",
    });
    setGenerateModal(true);
  };

  const handleGenerateSlots = async (e) => {
    e.preventDefault();

    await generateSlots({
      doctorId: Number(selectedSchedule.doctorId),
      fromDate: generateForm.fromDate,
      toDate: generateForm.toDate,
    });

    setGenerateModal(false);
    setSelectedSchedule(null);
    setGenerateForm({
      fromDate: "",
      toDate: "",
    });

    showSuccess("Appointment slots generated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-500 p-6 md:p-8 text-white shadow-xl shadow-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Doctor Schedules
            </h1>
            <p className="text-teal-50 mt-2">
              Create schedules and generate appointment slots for patients.
            </p>
          </div>

          <button
            onClick={getSchedules}
            className="flex items-center justify-center gap-2 bg-white text-teal-700 px-5 py-3 rounded-2xl font-bold hover:bg-teal-50 transition"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
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

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 bg-white rounded-[2rem] border shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              {editing ? <Pencil size={22} /> : <Plus size={22} />}
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-gray-900">
                {editing ? "Update Schedule" : "Create Schedule"}
              </h2>
              <p className="text-sm text-gray-500">
                {user?.role === "DOCTOR"
                  ? "Create your own weekly schedule."
                  : "Admin can create schedule for selected doctor."}
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            {user?.role === "ADMIN" && (
              <label className="block">
                <span className="text-sm font-bold text-gray-700">
                  Select Doctor
                </span>

                <select
                  name="doctorId"
                  value={form.doctorId}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="">Select doctor profile</option>

                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      #{doctor.id} — Dr. {doctor.user?.fullName}{" "}
                      {doctor.specialization
                        ? `(${doctor.specialization})`
                        : ""}
                    </option>
                  ))}
                </select>

                <p className="text-xs text-gray-400 mt-1">
                  This is doctor profile ID, not user ID.
                </p>
              </label>
            )}

            <label className="block">
              <span className="text-sm font-bold text-gray-700">Day</span>

              <select
                name="dayOfWeek"
                value={form.dayOfWeek}
                onChange={handleChange}
                className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <InputBox
                label="Start Time"
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={handleChange}
              />

              <InputBox
                label="End Time"
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={handleChange}
              />
            </div>

            <InputBox
              label="Slot Duration Minutes"
              name="slotDurationMinutes"
              type="number"
              value={form.slotDurationMinutes}
              onChange={handleChange}
              placeholder="30"
            />

            <label className="flex items-center justify-between bg-slate-50 border rounded-2xl px-5 py-4 cursor-pointer">
              <div className="flex items-center gap-3">
                {form.isActive ? (
                  <CheckCircle2 className="text-emerald-600" />
                ) : (
                  <XCircle className="text-red-600" />
                )}

                <div>
                  <p className="font-bold text-gray-900">Active Schedule</p>
                  <p className="text-sm text-gray-500">
                    Generated slots can be booked by patients.
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-5 h-5 accent-teal-600"
              />
            </label>

            <button
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700 disabled:opacity-60 transition"
            >
              <Save size={18} />
              {loading
                ? "Saving..."
                : editing
                  ? "Update Schedule"
                  : "Create Schedule"}
            </button>

            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 py-3 rounded-2xl font-bold hover:bg-gray-50 transition"
              >
                <X size={18} />
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="xl:col-span-2 bg-white rounded-[2rem] border shadow-sm overflow-hidden">
          <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">
                Schedule List
              </h2>
              <p className="text-sm text-gray-500">
                Total schedules: {schedules.length}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-gray-500">
                  <th className="px-6 py-4 font-bold">Doctor</th>
                  <th className="px-6 py-4 font-bold">Day</th>
                  <th className="px-6 py-4 font-bold">Time</th>
                  <th className="px-6 py-4 font-bold">Duration</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Loading schedules...
                    </td>
                  </tr>
                ) : schedules.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No schedule found.
                    </td>
                  </tr>
                ) : (
                  schedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="hover:bg-teal-50/40 transition"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-gray-900">
                            {schedule.doctor?.user?.fullName ||
                              `Doctor #${schedule.doctorId}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {schedule.doctor?.user?.email || "N/A"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 font-bold text-xs">
                          {schedule.dayOfWeek}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700 font-semibold">
                          <Clock size={16} className="text-teal-600" />
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-gray-700 font-semibold">
                          {schedule.slotDurationMinutes} min
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full font-bold text-xs ${
                            schedule.isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {schedule.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openGenerateModal(schedule)}
                            className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white transition flex items-center justify-center"
                            title="Generate slots"
                          >
                            <Zap size={16} />
                          </button>

                          <button
                            onClick={() => handleEdit(schedule)}
                            className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition flex items-center justify-center"
                            title="Edit schedule"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(schedule.id)}
                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center"
                            title="Delete schedule"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {generateModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-cyan-600 to-teal-500 text-white p-6 flex justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">Generate Slots</h2>
                <p className="text-cyan-50">
                  Create appointment slots from this schedule.
                </p>
              </div>

              <button
                onClick={() => setGenerateModal(false)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30"
              >
                <X className="mx-auto" />
              </button>
            </div>

            <form onSubmit={handleGenerateSlots} className="p-6 space-y-5">
              <div className="bg-slate-50 border rounded-2xl p-4">
                <p className="font-bold text-gray-900">
                  {selectedSchedule?.doctor?.user?.fullName ||
                    `Doctor #${selectedSchedule?.doctorId}`}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedSchedule?.dayOfWeek} | {selectedSchedule?.startTime}{" "}
                  - {selectedSchedule?.endTime}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {selectedSchedule?.slotDurationMinutes} minutes
                </p>
              </div>

              <label className="block">
                <span className="text-sm font-bold text-gray-700">
                  From Date
                </span>
                <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500">
                  <CalendarDays size={18} className="text-teal-600" />
                  <input
                    type="date"
                    value={generateForm.fromDate}
                    onChange={(e) =>
                      setGenerateForm((prev) => ({
                        ...prev,
                        fromDate: e.target.value,
                      }))
                    }
                    required
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-gray-700">To Date</span>
                <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500">
                  <CalendarDays size={18} className="text-teal-600" />
                  <input
                    type="date"
                    value={generateForm.toDate}
                    onChange={(e) =>
                      setGenerateForm((prev) => ({
                        ...prev,
                        toDate: e.target.value,
                      }))
                    }
                    required
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setGenerateModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-2xl font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  className="flex-1 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700 disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InputBox = ({ label, ...props }) => (
  <label className="block">
    <span className="text-sm font-bold text-gray-700">{label}</span>
    <input
      {...props}
      className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
    />
  </label>
);

export default DoctorSchedules;
