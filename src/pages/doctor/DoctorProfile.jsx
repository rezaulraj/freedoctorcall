import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Stethoscope,
  GraduationCap,
  BriefcaseMedical,
  DollarSign,
  Save,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useDoctorStore } from "../../stores/doctorStore";

const DoctorProfile = () => {
  const {
    myProfile,
    loading,
    error,
    getMyDoctorProfile,
    updateMyDoctorProfile,
  } = useDoctorStore();

  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    specialization: "",
    qualification: "",
    experienceYears: "",
    consultationFee: "",
    isAvailable: true,
  });

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getMyDoctorProfile();

      setForm({
        specialization: data.specialization || "",
        qualification: data.qualification || "",
        experienceYears: data.experienceYears || "",
        consultationFee: data.consultationFee || "",
        isAvailable: data.isAvailable ?? true,
      });
    };

    loadProfile();
  }, [getMyDoctorProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSuccess("");

    await updateMyDoctorProfile({
      specialization: form.specialization,
      qualification: form.qualification,
      experienceYears: Number(form.experienceYears),
      consultationFee: Number(form.consultationFee),
      isAvailable: form.isAvailable,
    });

    setSuccess("Doctor profile updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 p-6 md:p-8 text-white shadow-xl shadow-teal-100">
        <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center">
              <UserRound size={42} />
            </div>

            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold">
                {myProfile?.user?.fullName || "Doctor Profile"}
              </h1>
              <p className="text-teal-50 mt-1">
                Manage your professional information and availability.
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">
                  {myProfile?.specialization || "Specialization not set"}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    form.isAvailable ? "bg-emerald-400/30" : "bg-red-400/30"
                  }`}
                >
                  {form.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={getMyDoctorProfile}
            className="flex items-center justify-center gap-2 bg-white text-teal-700 px-5 py-3 rounded-2xl font-bold hover:bg-teal-50 transition"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-5 py-4 rounded-2xl">
          {success}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Account Info
            </h2>

            <div className="space-y-4">
              <InfoRow
                icon={UserRound}
                label="Name"
                value={myProfile?.user?.fullName}
              />
              <InfoRow
                icon={Mail}
                label="Email"
                value={myProfile?.user?.email}
              />
              <InfoRow
                icon={Phone}
                label="Phone"
                value={myProfile?.user?.phone}
              />
              <InfoRow
                icon={CheckCircle2}
                label="Account Status"
                value={myProfile?.user?.isActive ? "Active" : "Inactive"}
              />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Quick Summary
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <SummaryCard
                label="Experience"
                value={`${form.experienceYears || 0} yrs`}
              />
              <SummaryCard label="Fee" value={`${form.consultationFee || 0}`} />
              <SummaryCard
                label="Status"
                value={form.isAvailable ? "Open" : "Closed"}
              />
              <SummaryCard label="Role" value="Doctor" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Professional Profile
            </h2>
            <p className="text-gray-500 mt-1">
              Update your specialization, qualification, fee and availability.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <InputBox
                icon={Stethoscope}
                label="Specialization"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="Cardiology"
              />

              <InputBox
                icon={GraduationCap}
                label="Qualification"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="MBBS, FCPS"
              />

              <InputBox
                icon={BriefcaseMedical}
                label="Experience Years"
                name="experienceYears"
                type="number"
                value={form.experienceYears}
                onChange={handleChange}
                placeholder="8"
              />

              <InputBox
                icon={DollarSign}
                label="Consultation Fee"
                name="consultationFee"
                type="number"
                value={form.consultationFee}
                onChange={handleChange}
                placeholder="800"
              />
            </div>

            <label className="flex items-center justify-between gap-4 bg-slate-50 border rounded-2xl px-5 py-4 cursor-pointer">
              <div className="flex items-center gap-3">
                {form.isAvailable ? (
                  <CheckCircle2 className="text-emerald-600" />
                ) : (
                  <XCircle className="text-red-600" />
                )}

                <div>
                  <p className="font-bold text-gray-900">Availability Status</p>
                  <p className="text-sm text-gray-500">
                    Turn this on if patients can book your schedule.
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
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-600 text-white px-7 py-3 rounded-2xl font-bold hover:bg-teal-700 disabled:opacity-60 transition"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
      <Icon size={18} />
    </div>

    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold text-gray-800">{value || "N/A"}</p>
    </div>
  </div>
);

const SummaryCard = ({ label, value }) => (
  <div className="bg-slate-50 rounded-2xl p-4 border">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-lg font-extrabold text-gray-900 mt-1">{value}</p>
  </div>
);

const InputBox = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <label className="block">
    <span className="text-sm font-bold text-gray-700">{label}</span>

    <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-teal-500">
      <Icon size={18} className="text-teal-600" />

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-gray-800"
      />
    </div>
  </label>
);

export default DoctorProfile;
