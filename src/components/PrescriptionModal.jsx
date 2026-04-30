import { useEffect, useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Save,
  FileText,
  Pill,
  ClipboardPlus,
} from "lucide-react";
import { usePrescriptionStore } from "../stores/prescriptionStore";

const emptyMedicine = {
  medicineName: "",
  genericName: "",
  strength: "",
  type: "",
  dosage: "",
  frequency: "",
  duration: "",
  instructions: "",
};

const PrescriptionModal = ({
  isOpen,
  onClose,
  onSuccess,
  appointment,
  prescription,
}) => {
  const { createPrescription, updatePrescription, loading } =
    usePrescriptionStore();

  const isEdit = !!prescription;

  const [error, setError] = useState("");
  const [form, setForm] = useState({
    appointmentId: "",
    diagnosis: "",
    advice: "",
    medicines: [{ ...emptyMedicine }],
  });

  useEffect(() => {
    if (appointment && !isEdit) {
      setForm({
        appointmentId: appointment.id,
        diagnosis: "",
        advice: "",
        medicines: [{ ...emptyMedicine }],
      });
    }

    if (prescription) {
      setForm({
        appointmentId: prescription.appointmentId,
        diagnosis: prescription.diagnosis || "",
        advice: prescription.advice || "",
        medicines:
          prescription.medicines?.length > 0
            ? prescription.medicines.map((item) => ({
                medicineId: item.medicineId,
                medicineName: item.medicine?.medicineName || "",
                genericName: item.medicine?.genericName || "",
                strength: item.medicine?.strength || "",
                type: item.medicine?.type || "",
                dosage: item.dosage || "",
                frequency: item.frequency || "",
                duration: item.duration || "",
                instructions: item.instructions || "",
              }))
            : [{ ...emptyMedicine }],
      });
    }
  }, [appointment, prescription, isEdit]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const medicineChange = (index, field, value) => {
    const copy = [...form.medicines];
    copy[index][field] = value;

    setForm((prev) => ({
      ...prev,
      medicines: copy,
    }));
  };

  const addMedicine = () => {
    setForm((prev) => ({
      ...prev,
      medicines: [...prev.medicines, { ...emptyMedicine }],
    }));
  };

  const removeMedicine = (index) => {
    if (form.medicines.length === 1) return;

    setForm((prev) => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index),
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        appointmentId: Number(form.appointmentId),
        diagnosis: form.diagnosis,
        advice: form.advice,
        medicines: form.medicines,
      };

      if (isEdit) {
        const { appointmentId, ...updatePayload } = payload;
        await updatePrescription(prescription.id, updatePayload);
      } else {
        await createPrescription(payload);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-5xl max-h-[92vh] overflow-hidden bg-white rounded-[2rem] shadow-2xl">
        <div className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white p-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">
              {isEdit ? "Update Prescription" : "Create Prescription"}
            </h2>
            <p className="text-teal-50">
              Add diagnosis, advice and multiple medicines.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30"
          >
            <X className="mx-auto" />
          </button>
        </div>

        <form
          onSubmit={submitHandler}
          className="p-6 overflow-y-auto max-h-[calc(92vh-110px)] space-y-5"
        >
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <InputBox
              icon={FileText}
              label="Appointment ID"
              name="appointmentId"
              value={form.appointmentId}
              onChange={handleChange}
              disabled
            />

            <InputBox
              icon={ClipboardPlus}
              label="Diagnosis"
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              placeholder="Viral fever"
            />
          </div>

          <label className="block">
            <span className="text-sm font-bold text-gray-700">Advice</span>
            <textarea
              name="advice"
              value={form.advice}
              onChange={handleChange}
              rows={4}
              placeholder="Drink water and take rest"
              className="mt-2 w-full border rounded-2xl px-4 py-3 text-gray-950 outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </label>

          <div className="border rounded-[2rem] p-5 bg-slate-50/60">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  Medicines
                </h3>
                <p className="text-sm text-gray-500">
                  Add one or more medicines for this prescription.
                </p>
              </div>

              <button
                type="button"
                onClick={addMedicine}
                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-2xl font-bold hover:bg-teal-700"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            <div className="space-y-4">
              {form.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-950 border rounded-[1.5rem] p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <Pill size={18} className="text-teal-600" />
                      Medicine #{index + 1}
                    </h4>

                    <button
                      type="button"
                      onClick={() => removeMedicine(index)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-xl"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-3">
                    {[
                      ["medicineName", "Medicine Name"],
                      ["genericName", "Generic"],
                      ["strength", "Strength"],
                      ["type", "Type"],
                      ["dosage", "Dosage"],
                      ["frequency", "Frequency"],
                      ["duration", "Duration"],
                      ["instructions", "Instructions"],
                    ].map(([field, label]) => (
                      <input
                        key={field}
                        value={medicine[field]}
                        onChange={(e) =>
                          medicineChange(index, field, e.target.value)
                        }
                        placeholder={label}
                        className="border rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700 disabled:opacity-60"
          >
            <Save size={18} />
            {loading
              ? "Saving..."
              : isEdit
                ? "Update Prescription"
                : "Create Prescription"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputBox = ({ icon: Icon, label, ...props }) => (
  <label className="block">
    <span className="text-sm font-bold text-gray-700">{label}</span>
    <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 bg-white text-gray-950 focus-within:ring-2 focus-within:ring-teal-500">
      <Icon size={18} className="text-teal-600" />
      <input {...props} className="w-full outline-none bg-transparent" />
    </div>
  </label>
);

export default PrescriptionModal;
