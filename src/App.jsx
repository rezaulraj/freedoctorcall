import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import HomePage from "./pages/home/HomePage";
import Specialties from "./pages/specialties/Specialties";
import AboutUs from "./pages/about/AboutUs";
import Contact from "./pages/contact/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import PatientProfile from "./pages/patient/PatientProfile";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminPatients from "./pages/admin/AdminPatients";
import DoctorSchedules from "./pages/schedule/DoctorSchedules";
import AppointmentSlots from "./pages/slot/AppointmentSlots";
import Appointments from "./pages/appointment/Appointments";
import ConsultationRoom from "./pages/consultation/ConsultationRoom";
import Prescriptions from "./pages/prescription/Prescriptions";
import Notifications from "./pages/notification/Notifications";

const Placeholder = ({ title }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    <p className="text-gray-500 mt-2">This page is ready.</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route
        path="/consultation/:roomCode"
        element={
          <ProtectedRoute roles={["ADMIN", "DOCTOR", "PATIENT"]}>
            <ConsultationRoom />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["ADMIN", "DOCTOR", "PATIENT"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="schedules" element={<DoctorSchedules />} />
        <Route path="slots" element={<AppointmentSlots />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="notifications" element={<Notifications />} />

        <Route path="doctor-profile" element={<DoctorProfile />} />
        <Route path="patient-profile" element={<PatientProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
