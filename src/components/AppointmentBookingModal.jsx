import { useEffect, useState } from "react";
import { X, CalendarDays, UserRound, Clock, Send } from "lucide-react";
import { useDoctorStore } from "../stores/doctorStore";
import { useSlotStore } from "../stores/slotStore";
import { useAppointmentStore } from "../stores/appointmentStore";

const AppointmentBookingModal = ({ isOpen, onClose, onSuccess }) => {
  const { doctors, getAllDoctors } = useDoctorStore();
  const { slots, getSlots } = useSlotStore();
  const { bookAppointment, loading } = useAppointmentStore();

  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    slotId: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllDoctors();
    }
  }, [isOpen, getAllDoctors]);

  useEffect(() => {
    if (form.doctorId && form.date) {
      getSlots({
        doctorId: form.doctorId,
        date: form.date,
        status: "AVAILABLE",
      });
    }
  }, [form.doctorId, form.date, getSlots]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "doctorId" || e.target.name === "date") {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        slotId: "",
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await bookAppointment({
        doctorId: Number(form.doctorId),
        slotId: Number(form.slotId),
        reason: form.reason,
      });

      setSuccess("Appointment request submitted successfully");

      setForm({
        doctorId: "",
        date: "",
        slotId: "",
        reason: "",
      });

      if (onSuccess) onSuccess();

      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white p-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Book Appointment</h2>
            <p className="text-teal-50">
              Select doctor, date and available time slot.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30"
          >
            <X className="mx-auto" />
          </button>
        </div>

        <form onSubmit={submitHandler} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-3 rounded-2xl">
              {success}
            </div>
          )}

          <label className="block">
            <span className="text-sm font-bold text-gray-700">Doctor</span>
            <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500">
              <UserRound size={18} className="text-teal-600" />

              <select
                name="doctorId"
                value={form.doctorId}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              >
                <option value="">Select doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.user?.fullName} — {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-bold text-gray-700">Date</span>
              <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500">
                <CalendarDays size={18} className="text-teal-600" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-bold text-gray-700">Time Slot</span>
              <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500">
                <Clock size={18} className="text-teal-600" />

                <select
                  name="slotId"
                  value={form.slotId}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-transparent"
                >
                  <option value="">Select slot</option>
                  {slots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.startTime} - {slot.endTime}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold text-gray-700">Reason</span>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Example: Fever and headache"
              rows={4}
              className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </label>

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700 disabled:opacity-60"
          >
            <Send size={18} />
            {loading ? "Booking..." : "Submit Appointment Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBookingModal;
