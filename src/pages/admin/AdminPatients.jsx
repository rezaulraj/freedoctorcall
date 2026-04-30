import { useEffect, useMemo, useState } from "react";
import {
  Search,
  UserRound,
  Mail,
  Phone,
  Droplet,
  MapPin,
  Calendar,
  Pencil,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Download,
  Eye,
  Heart,
  Activity,
  Clock,
} from "lucide-react";
import { usePatientStore } from "../../stores/patientStore";

const AdminPatients = () => {
  const { patients, loading, error, getAllPatients, adminUpdatePatient } =
    usePatientStore();

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [bloodFilter, setBloodFilter] = useState("");

  useEffect(() => {
    getAllPatients();
  }, [getAllPatients]);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const text = `${patient.user?.fullName} ${patient.user?.email} ${patient.phone} ${patient.bloodGroup}`;
      const matchesSearch = text.toLowerCase().includes(search.toLowerCase());
      const matchesBlood =
        bloodFilter === "" || patient.bloodGroup === bloodFilter;
      return matchesSearch && matchesBlood;
    });
  }, [patients, search, bloodFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUpdate = async (id, payload) => {
    await adminUpdatePatient(id, payload);
    await getAllPatients();
    setSelectedPatient(null);
    setSuccess("Patient profile updated successfully");
    setTimeout(() => setSuccess(""), 2500);
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-500 p-8 text-white shadow-2xl shadow-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Patients
            </h1>
            <p className="text-blue-50 mt-2 text-lg">
              Manage patient health and personal profile information
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <div className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2">
              <span className="font-bold text-2xl">
                {filteredPatients.length}
              </span>
              <span className="ml-2 text-sm">Total Patients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 px-5 py-4 rounded-2xl shadow-md animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            {success}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-600 px-5 py-4 rounded-2xl shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {error}
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Patient Directory
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                View and manage all registered patients
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Blood Group Filter */}
              <div className="relative">
                <select
                  value={bloodFilter}
                  onChange={(e) => {
                    setBloodFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                >
                  <option value="">All Blood Groups</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by name, email, phone or blood group..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center gap-3 text-gray-500">
              <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              Loading patients...
            </div>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex flex-col items-center gap-3 text-gray-400">
              <UserRound size={48} className="opacity-30" />
              <p>No patients found</p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Blood Group
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      DOB
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedPatients.map((patient, idx) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                            <UserRound size={18} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">
                              {patient.user?.fullName}
                            </p>
                            <p className="text-xs text-gray-400 capitalize">
                              {patient.gender || "Not set"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail size={12} className="text-gray-400" />
                            <span className="text-xs">
                              {patient.user?.email?.slice(0, 25)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone size={12} className="text-gray-400" />
                            <span className="text-xs">
                              {patient.user?.phone || "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            patient.bloodGroup === "O+"
                              ? "bg-red-100 text-red-700"
                              : patient.bloodGroup === "A+"
                                ? "bg-green-100 text-green-700"
                                : patient.bloodGroup === "B+"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          <Droplet size={10} />
                          {patient.bloodGroup || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <MapPin
                            size={12}
                            className="text-gray-400 shrink-0"
                          />
                          <span className="text-xs truncate max-w-[150px]">
                            {patient.address || "Not provided"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Calendar size={12} className="text-gray-400" />
                          <span className="text-sm">
                            {patient.dob
                              ? new Date(patient.dob).toLocaleDateString()
                              : "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-all duration-200 text-sm font-medium"
                        >
                          <Pencil size={14} />
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                <p className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredPatients.length,
                  )}{" "}
                  of {filteredPatients.length} patients
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-200 bg-white disabled:opacity-50 hover:bg-gray-50 transition"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2)
                        pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 rounded-xl font-medium transition ${
                            currentPage === pageNum
                              ? "bg-cyan-600 text-white"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-200 bg-white disabled:opacity-50 hover:bg-gray-50 transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      {selectedPatient && (
        <PatientEditModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onSave={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
};

// Enhanced Edit Modal
const PatientEditModal = ({ patient, onClose, onSave, loading }) => {
  const [form, setForm] = useState({
    dob: patient.dob ? patient.dob.slice(0, 10) : "",
    gender: patient.gender || "",
    bloodGroup: patient.bloodGroup || "",
    address: patient.address || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSave(patient.id, form);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-500 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Update Patient Profile
            </h2>
            <p className="text-cyan-50 mt-1">{patient.user?.fullName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Calendar size={14} className="text-cyan-600" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Droplet size={14} className="text-cyan-600" />
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <MapPin size={14} className="text-cyan-600" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full address"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-teal-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPatients;
