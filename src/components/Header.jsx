import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  CalendarDays,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import AuthModal from "./AuthModal";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Specialties", href: "/specialties" },
    // { name: "Online Prescription", href: "/prescriptions" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const handleBookAppointment = () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }

    navigate("/dashboard/appointments");
  };

  const handleLogout = () => {
    setAccountOpen(false);
    setIsMenuOpen(false);
    logout();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg shadow-teal-100/50"
            : "bg-white/95 backdrop-blur-md"
        }`}
      >
        <div className="bg-teal-600 text-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
            <div className="flex items-center gap-6 text-[13px] font-medium">
              <span>Emergency: +880 1700-000000</span>
              <span>Mon–Sat: 8:00 AM – 8:00 PM</span>
            </div>

            <div className="text-[13px] font-medium">
              Online Consultation Available
            </div>
          </div>
        </div>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 lg:w-11 lg:h-11 bg-teal-600 rounded-xl flex items-center justify-center shadow-md text-white font-bold">
                M
              </div>

              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-xl lg:text-2xl text-gray-900 tracking-tight font-bold">
                  Medi<span className="text-teal-600">Care</span>
                </span>
                <span className="text-[10px] text-gray-400 tracking-[0.18em] uppercase font-semibold">
                  Health & Wellness
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-200 text-sm font-semibold ${
                    activeLink === link.name
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  {link.name}
                  {activeLink === link.name && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={handleBookAppointment}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-sm font-bold ${
                  user
                    ? "text-white bg-teal-600 hover:bg-teal-700 shadow-teal-200"
                    : "text-gray-400 bg-gray-100 cursor-pointer hover:bg-teal-50 hover:text-teal-600 border border-gray-200"
                }`}
                title={!user ? "Please sign in to book appointment" : ""}
              >
                <CalendarDays size={16} />
                Book Appointment
              </button>
              {!user ? (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="flex items-center gap-2 border border-teal-200 text-teal-600 px-4 py-2.5 rounded-xl hover:bg-teal-50 transition-all text-sm font-bold"
                >
                  <User size={16} />
                  Sign In
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onMouseEnter={() => setAccountOpen(true)}
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className="flex items-center gap-3 bg-teal-50 border border-teal-100 text-teal-800 px-3 py-2 rounded-2xl hover:bg-teal-100 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                      {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="text-left leading-tight">
                      <p className="text-sm font-bold max-w-[130px] truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-teal-600">{user.role}</p>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        accountOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {accountOpen && (
                    <div
                      onMouseLeave={() => setAccountOpen(false)}
                      className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-teal-100/60 overflow-hidden"
                    >
                      <div className="p-5 bg-gradient-to-br from-teal-50 to-cyan-50 border-b">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-lg font-bold">
                            {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div>
                            <p className="font-bold text-gray-900">
                              {user.fullName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.email || user.phone}
                            </p>
                            <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-teal-600 text-white font-bold">
                              {user.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            setAccountOpen(false);
                            navigate("/dashboard");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-teal-50 hover:text-teal-700 font-semibold transition"
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </button>

                        <button
                          onClick={() => {
                            setAccountOpen(false);
                            navigate("/dashboard/appointments");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-teal-50 hover:text-teal-700 font-semibold transition"
                        >
                          <CalendarDays size={18} />
                          My Appointments
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 font-semibold transition"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-[650px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-gray-100 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all text-sm font-semibold ${
                    activeLink === link.name
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 px-1">
                {user ? (
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold">
                        {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <p className="font-bold text-gray-900">
                          {user.fullName}
                        </p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-white text-teal-700 px-4 py-2.5 rounded-xl font-bold mb-2"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-bold"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 border border-teal-200 text-teal-600 px-4 py-2.5 rounded-lg hover:bg-teal-50 font-semibold"
                  >
                    <User size={16} />
                    Sign In
                  </button>
                )}

                <button
                  onClick={() => {
                    handleBookAppointment();
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all font-bold ${
                    user
                      ? "text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-200"
                      : "text-gray-400 bg-gray-100 border border-gray-200"
                  }`}
                >
                  <CalendarDays size={16} />
                  Book Appointment
                </button>

                {!user && (
                  <p className="text-xs text-center text-gray-400">
                    Please sign in first to book an appointment.
                  </p>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Header;
