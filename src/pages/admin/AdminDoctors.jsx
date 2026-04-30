import { useEffect, useMemo, useState } from "react";
import {
  Search,
  UserRound,
  Mail,
  Phone,
  Stethoscope,
  GraduationCap,
  DollarSign,
  Pencil,
  X,
  Save,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useDoctorStore } from "../../stores/doctorStore";

const AdminDoctors = () => {
  const { doctors, loading, error, getAllDoctors, adminUpdateDoctor } =
    useDoctorStore();

  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getAllDoctors();
  }, [getAllDoctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const text = `${doctor.user?.fullName} ${doctor.user?.email} ${doctor.specialization}`;
      return text.toLowerCase().includes(search.toLowerCase());
    });
  }, [doctors, search]);

  const handleUpdate = async (id, payload) => {
    await adminUpdateDoctor(id, payload);
    await getAllDoctors();
    setSelectedDoctor(null);
    setSuccess("Doctor profile updated successfully");
    setTimeout(() => setSuccess(""), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 to-cyan-500 p-6 md:p-8 text-white shadow-xl shadow-teal-100">
        <h1 className="text-3xl md:text-4xl font-extrabold">Doctors</h1>
        <p className="text-teal-50 mt-2">
          Manage doctor profiles, consultation fees and availability.
        </p>
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">All Doctors</h2>
            <p className="text-sm text-gray-500">
              Total doctors: {filteredDoctors.length}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor..."
              className="w-full pl-11 pr-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading doctors...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="border rounded-[1.5rem] p-5 hover:shadow-lg hover:shadow-teal-100 transition bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <UserRound size={26} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900">
                        {doctor.user?.fullName}
                      </h3>
                      <p className="text-sm text-teal-600 font-semibold">
                        {doctor.specialization}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      doctor.isAvailable
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {doctor.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <Info icon={Mail} value={doctor.user?.email} />
                  <Info icon={Phone} value={doctor.user?.phone} />
                  <Info icon={GraduationCap} value={doctor.qualification} />
                  <Info
                    icon={DollarSign}
                    value={`Fee: ${doctor.consultationFee}`}
                  />
                </div>

                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="mt-5 w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700 transition"
                >
                  <Pencil size={16} />
                  Update Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedDoctor && (
        <DoctorEditModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onSave={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
};

const Info = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <Icon size={16} className="text-teal-600" />
    <span className="truncate">{value || "N/A"}</span>
  </div>
);

const DoctorEditModal = ({ doctor, onClose, onSave, loading }) => {
  const [form, setForm] = useState({
    specialization: doctor.specialization || "",
    qualification: doctor.qualification || "",
    experienceYears: doctor.experienceYears || "",
    consultationFee: doctor.consultationFee || "",
    isAvailable: doctor.isAvailable ?? true,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSave(doctor.id, {
      specialization: form.specialization,
      qualification: form.qualification,
      experienceYears: Number(form.experienceYears),
      consultationFee: Number(form.consultationFee),
      isAvailable: form.isAvailable,
    });
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white p-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Update Doctor</h2>
            <p className="text-teal-50">{doctor.user?.fullName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20"
          >
            <X className="mx-auto" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              icon={Stethoscope}
              label="Specialization"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
            />
            <Input
              icon={GraduationCap}
              label="Qualification"
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
            />
            <Input
              label="Experience Years"
              name="experienceYears"
              type="number"
              value={form.experienceYears}
              onChange={handleChange}
            />
            <Input
              icon={DollarSign}
              label="Consultation Fee"
              name="consultationFee"
              type="number"
              value={form.consultationFee}
              onChange={handleChange}
            />
          </div>

          <label className="flex items-center justify-between bg-slate-50 border rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              {form.isAvailable ? (
                <CheckCircle2 className="text-emerald-600" />
              ) : (
                <XCircle className="text-red-600" />
              )}
              <div>
                <p className="font-bold">Doctor Availability</p>
                <p className="text-sm text-gray-500">
                  Patients can book this doctor
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              className="w-5 h-5 accent-teal-600"
            />
          </label>

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-2xl font-bold hover:bg-teal-700"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ icon: Icon = UserRound, label, ...props }) => (
  <label>
    <span className="text-sm font-bold text-gray-700">{label}</span>
    <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500">
      <Icon size={18} className="text-teal-600" />
      <input {...props} className="w-full outline-none bg-transparent" />
    </div>
  </label>
);

export default AdminDoctors;
