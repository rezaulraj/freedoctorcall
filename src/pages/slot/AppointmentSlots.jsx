import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  Filter,
  RefreshCw,
  Search,
  Ban,
  Unlock,
  CheckCircle2,
  XCircle,
  ShieldAlert,
} from "lucide-react";

import { useSlotStore } from "../../stores/slotStore";
import { useDoctorStore } from "../../stores/doctorStore";
import { useAuthStore } from "../../stores/authStore";

const statuses = ["AVAILABLE", "BOOKED", "BLOCKED"];

const AppointmentSlots = () => {
  const { user } = useAuthStore();
  const { doctors, getAllDoctors } = useDoctorStore();

  const {
    slots,
    loading,
    error,
    getSlots,
    blockSlot,
    unblockSlot,
    updateSlotStatus,
  } = useSlotStore();

  const [success, setSuccess] = useState("");
  const [filters, setFilters] = useState({
    doctorId: "",
    date: "",
    status: "",
  });

  const isAdminOrDoctor = ["ADMIN", "DOCTOR"].includes(user?.role);

  useEffect(() => {
    getSlots();

    if (user?.role === "ADMIN" || user?.role === "PATIENT") {
      getAllDoctors();
    }
  }, [getSlots, getAllDoctors, user?.role]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyFilters = async () => {
    const query = {};

    if (filters.doctorId) query.doctorId = filters.doctorId;
    if (filters.date) query.date = filters.date;
    if (filters.status) query.status = filters.status;

    await getSlots(query);
  };

  const resetFilters = async () => {
    setFilters({
      doctorId: "",
      date: "",
      status: "",
    });

    await getSlots();
  };

  const handleBlock = async (id) => {
    await blockSlot(id);
    await applyFilters();
    showSuccess("Slot blocked successfully");
  };

  const handleUnblock = async (id) => {
    await unblockSlot(id);
    await applyFilters();
    showSuccess("Slot unblocked successfully");
  };

  const handleStatusChange = async (id, status) => {
    await updateSlotStatus(id, status);
    await applyFilters();
    showSuccess("Slot status updated successfully");
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-500 p-6 md:p-8 text-white shadow-xl shadow-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Appointment Slots
            </h1>
            <p className="text-teal-50 mt-2">
              View doctor availability, filter slots, and manage booking
              availability.
            </p>
          </div>

          <button
            onClick={() => getSlots()}
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

      <div className="bg-white rounded-[2rem] border shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Filter size={22} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Filter Slots
            </h2>
            <p className="text-sm text-gray-500">
              Search by doctor, date and slot status.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <label className="block">
            <span className="text-sm font-bold text-gray-700">Doctor</span>
            <select
              name="doctorId"
              value={filters.doctorId}
              onChange={handleFilterChange}
              className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">All doctors</option>

              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  #{doctor.id} — {doctor.user?.fullName}
                </option>
              ))}
            </select>
          </label>

          <InputBox
            label="Date"
            name="date"
            type="date"
            value={filters.date}
            onChange={handleFilterChange}
          />

          <label className="block">
            <span className="text-sm font-bold text-gray-700">Status</span>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="mt-2 w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">All status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-2 items-end">
            <button
              onClick={applyFilters}
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700 transition"
            >
              <Search size={17} />
              Search
            </button>

            <button
              onClick={resetFilters}
              className="px-4 py-3 rounded-2xl border font-bold text-gray-600 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Slot List</h2>
            <p className="text-sm text-gray-500">Total slots: {slots.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-gray-500">
                <th className="px-6 py-4 font-bold">Doctor</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Time</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Schedule</th>
                {isAdminOrDoctor && (
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan={isAdminOrDoctor ? 6 : 5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Loading slots...
                  </td>
                </tr>
              ) : slots.length === 0 ? (
                <tr>
                  <td
                    colSpan={isAdminOrDoctor ? 6 : 5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No appointment slot found.
                  </td>
                </tr>
              ) : (
                slots.map((slot) => (
                  <tr key={slot.id} className="hover:bg-teal-50/40 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-gray-900">
                          {slot.doctor?.user?.fullName ||
                            `Doctor #${slot.doctorId}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {slot.doctor?.user?.email || "N/A"}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700 font-semibold">
                        <CalendarDays size={16} className="text-teal-600" />
                        {slot.slotDate
                          ? new Date(slot.slotDate).toDateString()
                          : "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700 font-semibold">
                        <Clock size={16} className="text-cyan-600" />
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={slot.status} />
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-gray-600">
                        {slot.schedule?.dayOfWeek || "Manual"}
                      </span>
                    </td>

                    {isAdminOrDoctor && (
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {slot.status === "AVAILABLE" && (
                            <button
                              onClick={() => handleBlock(slot.id)}
                              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition font-bold"
                            >
                              <Ban size={15} />
                              Block
                            </button>
                          )}

                          {slot.status === "BLOCKED" && (
                            <button
                              onClick={() => handleUnblock(slot.id)}
                              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition font-bold"
                            >
                              <Unlock size={15} />
                              Unblock
                            </button>
                          )}

                          {slot.status !== "BOOKED" && (
                            <select
                              value={slot.status}
                              onChange={(e) =>
                                handleStatusChange(slot.id, e.target.value)
                              }
                              className="border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                            >
                              {statuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    AVAILABLE: "bg-emerald-50 text-emerald-600",
    BOOKED: "bg-cyan-50 text-cyan-600",
    BLOCKED: "bg-red-50 text-red-600",
  };

  const icons = {
    AVAILABLE: CheckCircle2,
    BOOKED: ShieldAlert,
    BLOCKED: XCircle,
  };

  const Icon = icons[status] || CheckCircle2;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold text-xs ${
        styles[status] || "bg-gray-50 text-gray-600"
      }`}
    >
      <Icon size={14} />
      {status}
    </span>
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

export default AppointmentSlots;
