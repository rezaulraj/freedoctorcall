import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarDays,
  Clock,
  FileText,
  Bell,
  LogOut,
  Menu,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../stores/authStore";

const roleMenus = {
  ADMIN: [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Doctors", path: "/dashboard/doctors", icon: UserRound },
    { name: "Patients", path: "/dashboard/patients", icon: Users },
    { name: "Schedules", path: "/dashboard/schedules", icon: Clock },
    { name: "Appointment Slots", path: "/dashboard/slots", icon: CalendarDays },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: CalendarDays,
    },
    { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
  ],
  DOCTOR: [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", path: "/dashboard/doctor-profile", icon: UserRound },
    { name: "My Schedule", path: "/dashboard/schedules", icon: Clock },
    { name: "Appointment Slots", path: "/dashboard/slots", icon: CalendarDays },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: CalendarDays,
    },
    { name: "Prescriptions", path: "/dashboard/prescriptions", icon: FileText },
    { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
  ],
  PATIENT: [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Profile", path: "/dashboard/patient-profile", icon: UserRound },
    {
      name: "Book Appointment",
      path: "/dashboard/appointments",
      icon: CalendarDays,
    },
    { name: "Prescriptions", path: "/dashboard/prescriptions", icon: FileText },
    { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
  ],
};

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menus = roleMenus[user?.role] || [];

  const Sidebar = () => (
    <aside className="h-full bg-white border-r p-5 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Medi<span className="text-teal-600">Care</span>
        </h2>
        <p className="text-sm text-gray-500">{user?.role} Panel</p>
      </div>

      <nav className="space-y-2 flex-1">
        {menus.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
                active
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-100"
                  : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-red-600 hover:bg-red-50"
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:w-72">
        <Sidebar />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72">
            <Sidebar />
          </div>
        </div>
      )}

      <main className="lg:pl-72">
        <header className="sticky top-0 z-40 h-16 bg-white border-b px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
            >
              <Menu />
            </button>

            <div>
              <h1 className="font-bold text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-500">Welcome, {user?.fullName}</p>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-gray-900">{user?.fullName}</p>
            <p className="text-xs text-teal-600">{user?.role}</p>
          </div>
        </header>

        <section className="p-4 md:p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
