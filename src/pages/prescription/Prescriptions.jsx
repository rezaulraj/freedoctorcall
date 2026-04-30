import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Download,
  Pencil,
  Search,
  RefreshCw,
  UserRound,
  Stethoscope,
  CalendarDays,
  Pill,
  Plus,
} from "lucide-react";

import { useAuthStore } from "../../stores/authStore";
import { usePrescriptionStore } from "../../stores/prescriptionStore";
import { useAppointmentStore } from "../../stores/appointmentStore";
import PrescriptionModal from "../../components/PrescriptionModal";

const Prescriptions = () => {
  const { user } = useAuthStore();

  const {
    prescriptions,
    loading,
    error,
    getPrescriptions,
    downloadPrescription,
  } = usePrescriptionStore();

  const { appointments, getAppointments } = useAppointmentStore();

  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    getPrescriptions();

    if (user?.role === "DOCTOR") {
      getAppointments();
    }
  }, [getPrescriptions, getAppointments, user?.role]);

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((item) => {
      const text = `
        ${item.patient?.user?.fullName || ""}
        ${item.doctor?.user?.fullName || ""}
        ${item.diagnosis || ""}
        ${item.advice || ""}
      `;

      return text.toLowerCase().includes(search.toLowerCase());
    });
  }, [prescriptions, search]);

  const availableAppointments = appointments.filter(
    (item) =>
      ["APPROVED", "COMPLETED"].includes(item.status) && !item.prescription,
  );

  const openCreate = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedPrescription(null);
    setModalOpen(true);
  };

  const openEdit = (prescription) => {
    setSelectedPrescription(prescription);
    setSelectedAppointment(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
    setSelectedPrescription(null);
  };

  const refreshAll = async () => {
    await getPrescriptions();
    if (user?.role === "DOCTOR") await getAppointments();
  };

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 2500);
  };

  const handleDownload = async (id) => {
    await downloadPrescription(id);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-500 p-6 md:p-8 text-white shadow-xl shadow-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Prescriptions
            </h1>
            <p className="text-teal-50 mt-2">
              {user?.role === "DOCTOR"
                ? "Create, update and manage your patient prescriptions."
                : user?.role === "PATIENT"
                  ? "View and download your prescriptions anytime."
                  : "View all prescriptions and download medical records."}
            </p>
          </div>

          <button
            onClick={refreshAll}
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

      {user?.role === "DOCTOR" && (
        <div className="bg-white rounded-[2rem] border shadow-sm p-5">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">
            Create Prescription From Appointment
          </h2>

          {availableAppointments.length === 0 ? (
            <p className="text-gray-500">
              No approved appointment available for prescription.
            </p>
          ) : (
            <div className="grid lg:grid-cols-2 gap-4">
              {availableAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg hover:shadow-teal-100 transition"
                >
                  <div>
                    <p className="font-bold text-gray-900">
                      Appointment #{appointment.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Patient: {appointment.patient?.user?.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.slot?.slotDate
                        ? new Date(appointment.slot.slotDate).toDateString()
                        : "N/A"}{" "}
                      | {appointment.slot?.startTime} -{" "}
                      {appointment.slot?.endTime}
                    </p>
                  </div>

                  <button
                    onClick={() => openCreate(appointment)}
                    className="flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-2xl font-bold hover:bg-teal-700"
                  >
                    <Plus size={16} />
                    Create
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-[2rem] border shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Prescription List
            </h2>
            <p className="text-sm text-gray-500">
              Total prescriptions: {filteredPrescriptions.length}
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
              placeholder="Search prescription..."
              className="w-full pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        {loading ? (
          <div className="xl:col-span-2 bg-white rounded-3xl p-10 text-center text-gray-500">
            Loading prescriptions...
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="xl:col-span-2 bg-white rounded-3xl p-10 text-center text-gray-500">
            No prescription found.
          </div>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
              user={user}
              onDownload={handleDownload}
              onEdit={openEdit}
            />
          ))
        )}
      </div>

      <PrescriptionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSuccess={async () => {
          await refreshAll();
          showSuccess(
            selectedPrescription
              ? "Prescription updated successfully"
              : "Prescription created successfully",
          );
        }}
        appointment={selectedAppointment}
        prescription={selectedPrescription}
      />
    </div>
  );
};

const PrescriptionCard = ({ prescription, user, onDownload, onEdit }) => {
  const slot = prescription.appointment?.slot;

  return (
    <div className="bg-white border rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-teal-100 transition">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold">
            <FileText size={14} />
            Prescription #{prescription.id}
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 mt-3">
            {prescription.diagnosis || "No diagnosis"}
          </h3>

          <p className="text-gray-500 mt-1 line-clamp-2">
            {prescription.advice || "No advice provided"}
          </p>
        </div>

        <div className="flex gap-2">
          {user?.role === "DOCTOR" && (
            <button
              onClick={() => onEdit(prescription)}
              className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2.5 rounded-2xl font-bold hover:bg-orange-100"
            >
              <Pencil size={16} />
              Edit
            </button>
          )}

          <button
            onClick={() => onDownload(prescription.id)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-2xl font-bold hover:bg-teal-700"
          >
            <Download size={16} />
            PDF
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {user?.role !== "PATIENT" && (
          <InfoBox
            icon={UserRound}
            label="Patient"
            value={prescription.patient?.user?.fullName}
            sub={prescription.patient?.user?.phone}
          />
        )}

        {user?.role !== "DOCTOR" && (
          <InfoBox
            icon={Stethoscope}
            label="Doctor"
            value={`Dr. ${prescription.doctor?.user?.fullName}`}
            sub={prescription.doctor?.specialization}
          />
        )}

        <InfoBox
          icon={CalendarDays}
          label="Appointment"
          value={`#${prescription.appointmentId}`}
          sub={
            slot
              ? `${new Date(slot.slotDate).toDateString()} | ${slot.startTime} - ${slot.endTime}`
              : "N/A"
          }
        />

        <InfoBox
          icon={Pill}
          label="Medicines"
          value={`${prescription.medicines?.length || 0} item(s)`}
        />
      </div>

      <div className="mt-5 border-t pt-5">
        <h4 className="font-bold text-gray-900 mb-3">Medicine List</h4>

        <div className="space-y-2">
          {prescription.medicines?.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-3 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div>
                <p className="font-bold text-gray-900">
                  {item.medicine?.medicineName}{" "}
                  {item.medicine?.strength && `(${item.medicine.strength})`}
                </p>
                <p className="text-gray-500">{item.medicine?.genericName}</p>
              </div>

              <div className="text-gray-600 md:text-right">
                <p>
                  {item.dosage || "N/A"} | {item.frequency || "N/A"}
                </p>
                <p>
                  {item.duration || "N/A"} | {item.instructions || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
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

export default Prescriptions;
