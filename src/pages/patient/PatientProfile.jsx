import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Droplet,
  MapPin,
  Calendar,
  Save,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { usePatientStore } from "../../stores/patientStore";

const PatientProfile = () => {
  const {
    myProfile,
    loading,
    error,
    getMyPatientProfile,
    updateMyPatientProfile,
  } = usePatientStore();

  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
  });

  useEffect(() => {
    const load = async () => {
      const data = await getMyPatientProfile();

      setForm({
        dob: data.dob ? data.dob.slice(0, 10) : "",
        gender: data.gender || "",
        bloodGroup: data.bloodGroup || "",
        address: data.address || "",
      });
    };

    load();
  }, [getMyPatientProfile]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSuccess("");

    await updateMyPatientProfile(form);
    setSuccess("Patient profile updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-teal-600 via-cyan-500 to-emerald-500 p-6 md:p-8 text-white shadow-xl shadow-teal-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">
              <UserRound size={42} />
            </div>

            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold">
                {myProfile?.user?.fullName || "Patient Profile"}
              </h1>
              <p className="text-teal-50 mt-1">
                Manage your health and personal information.
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">
                  {form.bloodGroup || "Blood group not set"}
                </span>

                <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">
                  {form.gender || "Gender not set"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={getMyPatientProfile}
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
        <div className="space-y-6">
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
                icon={ShieldCheck}
                label="Account Status"
                value={myProfile?.user?.isActive ? "Active" : "Inactive"}
              />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              Health Summary
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="Blood" value={form.bloodGroup || "N/A"} />
              <SummaryCard label="Gender" value={form.gender || "N/A"} />
              <SummaryCard label="DOB" value={form.dob || "N/A"} />
              <SummaryCard label="Role" value="Patient" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Personal & Health Information
          </h2>
          <p className="text-gray-500 mt-1 mb-6">
            Keep your information updated for better appointment support.
          </p>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <InputBox
                icon={Calendar}
                label="Date of Birth"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
              />

              <SelectBox
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
              />

              <SelectBox
                label="Blood Group"
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                icon={Droplet}
              />

              <InputBox
                icon={MapPin}
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Dhaka, Bangladesh"
              />
            </div>

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

const SelectBox = ({
  label,
  name,
  value,
  onChange,
  options,
  icon: Icon = UserRound,
}) => (
  <label className="block">
    <span className="text-sm font-bold text-gray-700">{label}</span>

    <div className="mt-2 flex items-center gap-3 border rounded-2xl px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-teal-500">
      <Icon size={18} className="text-teal-600" />

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full outline-none bg-transparent text-gray-800"
      >
        <option value="">Select {label}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  </label>
);

export default PatientProfile;
