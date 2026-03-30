import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Specialties", href: "/specialties" },
    { name: "Services", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const fontNunito = { fontFamily: "'Nunito Sans', sans-serif" };
  const fontPlayfair = { fontFamily: "'Playfair Display', serif" };

  return (
    <header
      style={fontNunito}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg shadow-teal-100/50"
          : "bg-white/95 backdrop-blur-md"
      }`}
    >
      {/* ── Top Info Bar ── */}
      <div className="bg-teal-600 text-white hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6 text-[13px] font-medium tracking-wide">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Emergency: +1 (800) 123-4567
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Mon–Sat: 8:00 AM – 8:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4 text-[13px] font-medium">
            <a href="#" className="hover:text-teal-200 transition-colors">
              Patient Portal
            </a>
            <span className="text-teal-400">|</span>
            <a href="#" className="hover:text-teal-200 transition-colors">
              Insurance Plans
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 lg:w-11 lg:h-11 bg-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:bg-teal-700 transition-colors">
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span
                style={{ ...fontPlayfair, fontWeight: 700 }}
                className="text-xl lg:text-2xl text-gray-900 tracking-tight"
              >
                Medi<span className="text-teal-600">Care</span>
              </span>
              <span
                style={{ ...fontNunito, fontWeight: 600 }}
                className="text-[10px] text-gray-400 tracking-[0.18em] uppercase"
              >
                Health &amp; Wellness
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.name)}
                style={{ ...fontNunito, fontWeight: 600, fontSize: "14px" }}
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeLink === link.name
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full" />
                )}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {/* <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button> */}

            {/* Sign In */}
            <a
              href="#"
              style={{ ...fontNunito, fontSize: "14px", fontWeight: 600 }}
              className="flex items-center gap-1.5 border border-teal-200 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Sign In
            </a>

            {/* Book Appointment */}
            <a
              href="#"
              style={{ ...fontNunito, fontSize: "14px", fontWeight: 700 }}
              className="flex items-center gap-1.5 text-white bg-teal-600 px-5 py-2.5 rounded-lg hover:bg-teal-700 shadow-md shadow-teal-200 transition-all hover:shadow-lg active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Book Appointment
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-teal-600 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setIsMenuOpen(false);
                }}
                style={{ ...fontNunito, fontSize: "14px", fontWeight: 600 }}
                className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                  activeLink === link.name
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 px-1">
              <a
                href="#"
                style={{ ...fontNunito, fontSize: "14px", fontWeight: 600 }}
                className="flex items-center justify-center gap-2 border border-teal-200 text-teal-600 px-4 py-2.5 rounded-lg hover:bg-teal-50 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Sign In
              </a>
              <a
                href="#"
                style={{ ...fontNunito, fontSize: "14px", fontWeight: 700 }}
                className="flex items-center justify-center gap-2 text-white bg-teal-600 px-4 py-2.5 rounded-lg hover:bg-teal-700 transition-all shadow-md shadow-teal-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
