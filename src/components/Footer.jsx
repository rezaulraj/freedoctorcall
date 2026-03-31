import React, { useState } from "react";

const footerLinks = {
  "Our Services": [
    { label: "Find a Doctor", href: "#" },
    { label: "Book Appointment", href: "#" },
    { label: "Video Consultation", href: "#" },
    { label: "Online Prescription", href: "#" },
    { label: "Health Packages", href: "#" },
    { label: "Lab & Diagnostics", href: "#" },
  ],
  Specialties: [
    { label: "General Medicine", href: "#" },
    { label: "Cardiology", href: "#" },
    { label: "Neurology", href: "#" },
    { label: "Orthopedics", href: "#" },
    { label: "Dermatology", href: "#" },
    { label: "Pediatrics", href: "#" },
  ],
  "Patient Help": [
    { label: "Patient Portal", href: "#" },
    { label: "Insurance Plans", href: "#" },
    { label: "Medical Records", href: "#" },
    { label: "Prescription Refill", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Contact Support", href: "#" },
  ],
  Company: [
    { label: "About MediCare", href: "#" },
    { label: "Our Doctors", href: "#" },
    { label: "Press & Media", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  const fontNunito = { fontFamily: "'Nunito Sans', sans-serif" };
  const fontPlayfair = { fontFamily: "'Playfair Display', serif" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

        .footer-bg {
          background: linear-gradient(170deg, #0a1628 0%, #0d2d2a 40%, #0f3340 70%, #0a1e28 100%);
          position: relative; overflow: hidden;
        }
        .footer-bg::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 45% at 5%  5%,  rgba(13,148,136,.18) 0%, transparent 60%),
            radial-gradient(ellipse 45% 35% at 95% 5%,  rgba(6,182,212,.10)  0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 85% 95%, rgba(16,185,129,.10) 0%, transparent 55%),
            radial-gradient(ellipse 35% 28% at 0%  90%, rgba(99,102,241,.06) 0%, transparent 50%);
          pointer-events: none;
        }

        .footer-link {
          font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,.45);
          transition: color .18s;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Nunito Sans', sans-serif;
        }
        .footer-link:hover { color: #5eead4; }
        .footer-link:hover .link-arrow { opacity: 1; transform: translateX(2px); }

        .link-arrow {
          width: 12px; height: 12px; opacity: 0;
          transition: opacity .18s, transform .18s;
        }

        .social-btn {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: all .18s;
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.55);
          background: rgba(255,255,255,.06);
        }
        .social-btn:hover {
          background: linear-gradient(135deg,#0d9488,#06b6d4);
          border-color: transparent; color: white;
          box-shadow: 0 4px 14px rgba(13,148,136,.35);
          transform: translateY(-2px);
        }

        .newsletter-input {
          flex: 1; padding: 13px 16px; border-radius: 12px 0 0 12px;
          border: 1.5px solid rgba(255,255,255,.12); border-right: none;
          background: rgba(255,255,255,.07); color: white; font-size: 13px;
          outline: none; font-family: 'Nunito Sans', sans-serif; font-weight: 500;
          transition: border-color .18s, background .18s;
        }
        .newsletter-input:focus { border-color: rgba(13,148,136,.50); background: rgba(255,255,255,.10); }
        .newsletter-input::placeholder { color: rgba(255,255,255,.30); }

        .newsletter-btn {
          padding: 13px 22px; border-radius: 0 12px 12px 0;
          background: linear-gradient(135deg,#0d9488,#06b6d4);
          color: white; font-weight: 800; font-size: 13px;
          border: none; cursor: pointer; font-family: 'Nunito Sans', sans-serif;
          transition: opacity .18s;
          white-space: nowrap;
        }
        .newsletter-btn:hover { opacity: .90; }

        .footer-divider { height: 1px; background: rgba(255,255,255,.07); }

        .badge-pill {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(13,148,136,.18); border: 1px solid rgba(13,148,136,.30);
          color: #5eead4; padding: 4px 12px; border-radius: 999px;
          font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
          font-family: 'Nunito Sans', sans-serif;
        }

        .accred-badge {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 12px; padding: 10px 14px;
          font-family: 'Nunito Sans', sans-serif;
        }

        .grad-text-light {
          background: linear-gradient(135deg,#5eead4,#67e8f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.6); }
          50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #10b981;
          animation: dotPulse 2s ease infinite; flex-shrink: 0;
        }
      `}</style>

      <footer className="footer-bg" style={fontNunito}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── TOP: Newsletter ── */}
          <div className="py-12 border-b border-white/[0.07]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-md">
                <span className="badge-pill mb-3 inline-flex">
                  <span className="live-dot" />
                  Health Updates
                </span>
                <h3
                  style={fontPlayfair}
                  className="text-2xl font-bold text-white leading-snug mb-2"
                >
                  Stay Ahead of Your{" "}
                  <span className="grad-text-light italic">Health</span>
                </h3>
                <p className="text-white/40 text-sm">
                  Health tips, new doctor profiles, and exclusive offers — right
                  to your inbox.
                </p>
              </div>
              <div className="max-w-md w-full lg:w-auto">
                {subbed ? (
                  <div className="flex items-center gap-3 bg-teal-500/15 border border-teal-400/25 rounded-2xl px-5 py-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#0d9488,#06b6d4)",
                      }}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-teal-300 text-sm font-bold">
                      You're subscribed! Welcome to MediCare family. 🎉
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email) setSubbed(true);
                    }}
                    className="flex w-full"
                  >
                    <input
                      type="email"
                      className="newsletter-input"
                      placeholder="Enter your email address…"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="newsletter-btn">
                      Subscribe
                    </button>
                  </form>
                )}
                <p className="text-white/25 text-[11px] mt-2 ml-1">
                  No spam. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>

          {/* ── MAIN LINKS ── */}
          <div className="py-14 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-10">
            {/* Brand col */}
            <div className="col-span-2 lg:col-span-2 space-y-5">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                  </svg>
                </div>
                <div>
                  <p
                    style={fontPlayfair}
                    className="text-xl font-bold text-white tracking-tight"
                  >
                    Medi<span className="text-teal-400">Care</span>
                  </p>
                  <p className="text-[10px] text-white/30 font-semibold tracking-[.18em] uppercase">
                    Health &amp; Wellness
                  </p>
                </div>
              </div>

              <p className="text-white/40 text-sm leading-relaxed">
                Connecting patients with world-class doctors across 20+
                specialties. Your health, our mission — every single day.
              </p>

              {/* Accreditation badges */}
              <div className="space-y-2">
                {[
                  { icon: "🏅", label: "NABH Accredited Hospital" },
                  { icon: "✅", label: "ISO 9001:2015 Certified" },
                  { icon: "🔒", label: "HIPAA Compliant Platform" },
                ].map((b) => (
                  <div key={b.label} className="accred-badge">
                    <span className="text-base">{b.icon}</span>
                    <span className="text-white/50 text-xs font-semibold">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div>
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-3">
                  Follow Us
                </p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      title={s.label}
                      className="social-btn"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([col, links]) => (
              <div key={col} className="col-span-1 space-y-4">
                <h4
                  style={fontPlayfair}
                  className="text-sm font-bold text-white tracking-wide"
                >
                  {col}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="footer-link">
                        {l.label}
                        <svg
                          className="link-arrow"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="footer-divider" />
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} MediCare Health &amp; Wellness. All
              rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-white/30 text-xs">
              <span className="live-dot" />
              <span>All systems operational</span>
            </div>
            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Use", "Cookie Settings"].map(
                (l) => (
                  <a key={l} href="#" className="footer-link text-[12px]">
                    {l}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
