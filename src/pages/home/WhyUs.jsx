import React, { useState, useRef } from "react";

/* ─── Why Choose Us data (Insurance & Easy Payments removed) ─── */
const reasons = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Verified & Certified Doctor",
    desc: "Dr. Sarah Lee is board-certified, background-checked, and peer-reviewed. Your safety is our first promise.",
    gradient: "from-teal-500 to-cyan-400",
    lightBg: "from-teal-50 to-cyan-50",
    accent: "#0d9488",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Instant Appointment Booking",
    desc: "Skip the waiting room. Book same-day or next-day slots with Dr. Sarah Lee in under 60 seconds, 24/7.",
    gradient: "from-emerald-500 to-teal-400",
    lightBg: "from-emerald-50 to-teal-50",
    accent: "#059669",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Video & In-Person Consults",
    desc: "Choose how you want to be seen — secure HD video consultations from home or walk-in at our partner clinics.",
    gradient: "from-cyan-500 to-sky-400",
    lightBg: "from-cyan-50 to-sky-50",
    accent: "#0891b2",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Digital Health Records",
    desc: "All your prescriptions, lab results, and visit history are stored securely in one place — accessible anytime, on any device.",
    gradient: "from-sky-500 to-indigo-400",
    lightBg: "from-sky-50 to-indigo-50",
    accent: "#0284c7",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    title: "24/7 Patient Support",
    desc: "Our dedicated care team is on call round the clock. Chat, call, or email — we're always here when you need us most.",
    gradient: "from-rose-400 to-pink-400",
    lightBg: "from-rose-50 to-pink-50",
    accent: "#e11d48",
  },
];

/* ─── Specialties data ─── */
const specialties = [
  {
    icon: "🫀",
    label: "Cardiology",
    desc: "Heart & Vascular",
    count: "48 Doctors",
    color: "#fee2e2",
    accent: "#ef4444",
  },
  {
    icon: "🧠",
    label: "Neurology",
    desc: "Brain & Nerves",
    count: "32 Doctors",
    color: "#ede9fe",
    accent: "#7c3aed",
  },
  {
    icon: "🦷",
    label: "Dental",
    desc: "Oral & Dental Care",
    count: "56 Doctors",
    color: "#d1fae5",
    accent: "#059669",
  },
  {
    icon: "👁️",
    label: "Ophthalmology",
    desc: "Eye & Vision",
    count: "29 Doctors",
    color: "#cffafe",
    accent: "#0891b2",
  },
  {
    icon: "🦴",
    label: "Orthopedics",
    desc: "Bones & Joints",
    count: "41 Doctors",
    color: "#fef3c7",
    accent: "#d97706",
  },
  {
    icon: "🩺",
    label: "General Medicine",
    desc: "Primary Healthcare",
    count: "72 Doctors",
    color: "#dcfce7",
    accent: "#16a34a",
  },
  {
    icon: "🧬",
    label: "Dermatology",
    desc: "Skin & Hair",
    count: "38 Doctors",
    color: "#fce7f3",
    accent: "#db2777",
  },
  {
    icon: "🫁",
    label: "Pulmonology",
    desc: "Lungs & Respiratory",
    count: "25 Doctors",
    color: "#e0f2fe",
    accent: "#0284c7",
  },
  {
    icon: "🩻",
    label: "Radiology",
    desc: "Imaging & Diagnostics",
    count: "18 Doctors",
    color: "#f0fdf4",
    accent: "#15803d",
  },
  {
    icon: "👶",
    label: "Pediatrics",
    desc: "Child Healthcare",
    count: "44 Doctors",
    color: "#fff7ed",
    accent: "#ea580c",
  },
  {
    icon: "🧓",
    label: "Geriatrics",
    desc: "Senior Care",
    count: "22 Doctors",
    color: "#f5f3ff",
    accent: "#6d28d9",
  },
  {
    icon: "🏥",
    label: "Surgery",
    desc: "General & Specialty",
    count: "35 Doctors",
    color: "#ecfdf5",
    accent: "#0d9488",
  },
];

export default function WhyUs() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCard, setActiveCard] = useState(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-nunito   { font-family: 'Nunito Sans', sans-serif; }

        .whyus-bg {
          background-color: #f8fffe;
          background-image:
            radial-gradient(ellipse 60% 40% at 0%   0%,  rgba(13,148,136,.10) 0%, transparent 65%),
            radial-gradient(ellipse 50% 35% at 100% 0%,  rgba(6,182,212,.09)  0%, transparent 60%),
            radial-gradient(ellipse 45% 30% at 100% 100%,rgba(16,185,129,.08) 0%, transparent 60%),
            radial-gradient(ellipse 55% 38% at 0%   100%,rgba(99,102,241,.06) 0%, transparent 55%);
        }

        .spec-bg {
          background: linear-gradient(160deg, #0f172a 0%, #0d2d2a 40%, #0f3d3a 70%, #0a2e35 100%);
        }

        /* Doctor profile card in Why Us */
        .doctor-profile-card {
          background: rgba(255,255,255,.92);
          border-radius: 1.5rem;
          border: 1px solid rgba(13,148,136,.15);
          box-shadow: 0 4px 24px rgba(13,148,136,.10), 0 1px 4px rgba(0,0,0,.04);
          overflow: hidden;
        }

        .why-card {
          background: rgba(255,255,255,.92);
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,.8);
          box-shadow: 0 4px 24px rgba(13,148,136,.07), 0 1px 4px rgba(0,0,0,.04);
          transition: transform .22s ease, box-shadow .22s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .why-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(13,148,136,.14), 0 4px 12px rgba(0,0,0,.06); }
        .why-card.active { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(13,148,136,.18); }

        .icon-wrap {
          width: 60px; height: 60px;
          border-radius: 1rem;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .spec-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 8px;
        }
        .spec-scroll::-webkit-scrollbar { display: none; }

        .spec-card {
          flex-shrink: 0;
          scroll-snap-align: start;
          width: 168px;
          border-radius: 1.25rem;
          padding: 20px 16px;
          cursor: pointer;
          border: 1.5px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(10px);
          transition: transform .2s ease, background .2s, border-color .2s, box-shadow .2s;
          position: relative;
          overflow: hidden;
        }
        .spec-card::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .spec-card:hover {
          transform: translateY(-4px) scale(1.02);
          background: rgba(255,255,255,.12);
          border-color: rgba(255,255,255,.25);
          box-shadow: 0 16px 40px rgba(0,0,0,.25);
        }

        .arr-btn {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: all .18s;
          cursor: pointer;
          flex-shrink: 0;
        }
        .arr-btn-enabled {
          background: rgba(255,255,255,.12);
          border: 1.5px solid rgba(255,255,255,.20);
          color: white;
        }
        .arr-btn-enabled:hover {
          background: linear-gradient(135deg,#0d9488,#06b6d4);
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(13,148,136,.40);
        }
        .arr-btn-disabled {
          background: rgba(255,255,255,.04);
          border: 1.5px solid rgba(255,255,255,.08);
          color: rgba(255,255,255,.25);
          cursor: not-allowed;
        }

        .section-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, rgba(13,148,136,.12), rgba(6,182,212,.12));
          border: 1px solid rgba(13,148,136,.22);
          color: #0d9488;
          padding: 6px 16px; border-radius: 999px;
          font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
        }
        .section-pill-dark {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(13,148,136,.18);
          border: 1px solid rgba(13,148,136,.35);
          color: #5eead4;
          padding: 6px 16px; border-radius: 999px;
          font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
        }

        .grad-text {
          background: linear-gradient(135deg,#0d9488,#0891b2);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .grad-text-light {
          background: linear-gradient(135deg,#5eead4,#67e8f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .wave-divider { line-height: 0; overflow: hidden; }

        .count-badge {
          font-size: 10px; font-weight: 700;
          padding: 2px 8px; border-radius: 999px;
          background: rgba(255,255,255,.14);
          color: rgba(255,255,255,.75);
          border: 1px solid rgba(255,255,255,.12);
        }

        .card-num {
          position: absolute; top: 16px; right: 18px;
          font-size: 42px; font-weight: 800; line-height: 1;
          color: rgba(13,148,136,.06);
          font-family: 'Playfair Display', serif;
          pointer-events: none;
          user-select: none;
        }

        .trust-item {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px; border-radius: 1rem;
          background: rgba(255,255,255,.86);
          border: 1px solid rgba(255,255,255,.75);
          box-shadow: 0 2px 12px rgba(13,148,136,.07);
        }

        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.5); }
          50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #10b981;
          animation: dotPulse 2s ease infinite; flex-shrink: 0;
        }

        .medicine-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, rgba(13,148,136,.12), rgba(6,182,212,.12));
          border: 1px solid rgba(13,148,136,.22);
          color: #0d9488;
          padding: 4px 12px; border-radius: 999px;
          font-size: 11px; font-weight: 700;
        }

        .stat-chip {
          display: flex; flex-direction: column; align-items: center;
          padding: 10px 18px; border-radius: .75rem;
          background: rgba(13,148,136,.07);
          border: 1px solid rgba(13,148,136,.12);
        }
      `}</style>

      {/* ════════════════════════════════════════════════
          SECTION 1 — WHY CHOOSE US
      ════════════════════════════════════════════════ */}
      <section className="whyus-bg font-nunito py-20 lg:py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 opacity-[0.04]">
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
            <circle cx="500" cy="0" r="300" stroke="#0d9488" strokeWidth="80" />
            <circle cx="500" cy="0" r="180" stroke="#06b6d4" strokeWidth="40" />
          </svg>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 opacity-[0.04]">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="0" cy="400" r="250" stroke="#0d9488" strokeWidth="60" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Section Header ── */}
          <div className="text-center mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-pill">
                <span className="live-dot" />
                Why Patients Choose Us
              </span>
            </div>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-gray-900 leading-tight mb-5">
              Healthcare You Can <span className="grad-text italic">Trust</span>
              <br className="hidden sm:block" />
              <span className="text-gray-900"> — Always</span>
            </h2>
            <p className="font-nunito text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              We've reimagined every part of the patient experience — from
              finding the right doctor to getting your results — so you can
              focus on what matters most:{" "}
              <span className="text-gray-800 font-semibold">your health.</span>
            </p>
          </div>

          {/* ── Doctor Profile Highlight ── */}
          <div className="doctor-profile-card mb-12 p-6 lg:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Sarah Lee"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg,#0d9488,#06b6d4)",
                }}
              >
                ✓
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start mb-2">
                <h3 className="font-playfair text-2xl font-bold text-gray-900">
                  Dr. Sarah Lee
                </h3>
                <span className="medicine-tag">💊 Medicine Specialist</span>
              </div>
              <p className="font-nunito text-teal-600 font-semibold text-sm mb-1">
                Cardiologist · MBBS, MD
              </p>
              <p className="font-nunito text-gray-500 text-sm leading-relaxed max-w-xl">
                Board-certified cardiologist with 12+ years of experience.
                Dedicated to delivering compassionate, evidence-based medicine
                to every patient.
              </p>
            </div>

            <div className="flex gap-3 shrink-0 flex-wrap justify-center">
              <div className="stat-chip">
                <span className="font-playfair text-xl font-bold grad-text">
                  1K+
                </span>
                <span className="font-nunito text-[11px] text-gray-500 font-semibold mt-0.5">
                  Patients
                </span>
              </div>
              <div className="stat-chip">
                <span className="font-playfair text-xl font-bold grad-text">
                  4.9★
                </span>
                <span className="font-nunito text-[11px] text-gray-500 font-semibold mt-0.5">
                  Rating
                </span>
              </div>
              <div className="stat-chip">
                <span className="font-playfair text-xl font-bold grad-text">
                  12yr
                </span>
                <span className="font-nunito text-[11px] text-gray-500 font-semibold mt-0.5">
                  Experience
                </span>
              </div>
            </div>
          </div>

          {/* ── 5 Reason Cards (2-3 grid) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reasons.map((r, i) => (
              <div
                key={i}
                className={`why-card ${activeCard === i ? "active" : ""}`}
                onClick={() => setActiveCard(activeCard === i ? null : i)}
              >
                {/* Top colour bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${r.gradient}`}
                  style={{
                    opacity: activeCard === i ? 1 : 0,
                    transition: "opacity .22s",
                  }}
                />

                <span className="card-num">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="p-6 lg:p-7">
                  <div
                    className={`icon-wrap mb-5 bg-gradient-to-br ${r.lightBg}`}
                    style={{ color: r.accent }}
                  >
                    {r.icon}
                  </div>

                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2.5 leading-tight">
                    {r.title}
                  </h3>

                  <p className="font-nunito text-gray-500 text-sm leading-relaxed">
                    {r.desc}
                  </p>

                  <div
                    className="mt-5 flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: r.accent }}
                  >
                    Learn more
                    <svg
                      className="w-3.5 h-3.5"
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
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Trust Bar ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                val: "1K+",
                label: "Patients Treated",
                icon: "😊",
                color: "#0d9488",
              },
              {
                val: "4.9★",
                label: "Patient Rating",
                icon: "⭐",
                color: "#0891b2",
              },
              {
                val: "98%",
                label: "Success Rate",
                icon: "✅",
                color: "#059669",
              },
              {
                val: "12yr",
                label: "Experience",
                icon: "🏅",
                color: "#7c3aed",
              },
            ].map((t, i) => (
              <div key={i} className="trust-item">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p
                    className="font-playfair text-2xl font-bold"
                    style={{
                      background: `linear-gradient(135deg,${t.color},#06b6d4)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {t.val}
                  </p>
                  <p className="font-nunito text-xs text-gray-500 font-semibold">
                    {t.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider bg-[#f8fffe]">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "60px", display: "block" }}
        >
          <path
            d="M0 0 Q360 60 720 30 Q1080 0 1440 50 L1440 60 L0 60 Z"
            fill="#0f172a"
          />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════
          SECTION 2 — OUR SPECIALITIES
      ════════════════════════════════════════════════ */}
      <section className="spec-bg font-nunito py-20 lg:py-28 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle,#0d9488,transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle,#06b6d4,transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5"
          style={{
            background: "radial-gradient(ellipse,#5eead4,transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Section Header + Arrows ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex mb-4">
                <span className="section-pill-dark">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Our Specialities
                </span>
              </div>
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-tight">
                <span className="text-white">Expert Care Across</span>
                <br />
                <span className="grad-text-light italic">Every Specialty</span>
              </h2>
              <p className="font-nunito text-gray-400 text-base mt-4 max-w-lg leading-relaxed">
                Dr. Sarah Lee covers a wide range of medical specialties —{" "}
                <span className="text-teal-300 font-semibold">
                  20+ areas of care
                </span>{" "}
                with a focus on compassionate, evidence-based treatment.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-nunito text-sm text-gray-400 hidden sm:block">
                {specialties.length} Specialities
              </span>
              <button
                onClick={() => scroll("left")}
                className={`arr-btn ${canScrollLeft ? "arr-btn-enabled" : "arr-btn-disabled"}`}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className={`arr-btn ${canScrollRight ? "arr-btn-enabled" : "arr-btn-disabled"}`}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Scrollable Specialty Cards ── */}
          <div
            ref={scrollRef}
            className="spec-scroll pb-4"
            onScroll={handleScroll}
          >
            {specialties.map((s, i) => (
              <div key={i} className="spec-card group">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 shrink-0"
                  style={{
                    background: s.color + "25",
                    border: `1.5px solid ${s.color}30`,
                  }}
                >
                  {s.icon}
                </div>
                <h4 className="font-playfair font-bold text-white text-base leading-tight mb-1">
                  {s.label}
                </h4>
                <p className="font-nunito text-gray-400 text-xs leading-snug mb-3">
                  {s.desc}
                </p>
                <span className="count-badge">{s.count}</span>
                <div
                  className="mt-4 flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    color:
                      s.accent === "#ef4444"
                        ? "#fca5a5"
                        : s.accent === "#7c3aed"
                          ? "#c4b5fd"
                          : "#5eead4",
                  }}
                >
                  View All
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* ── Scroll Progress ── */}
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: Math.ceil(specialties.length / 3) }).map(
              (_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-200"
                  style={{
                    width: i === 0 ? "28px" : "8px",
                    background:
                      i === 0
                        ? "linear-gradient(90deg,#0d9488,#06b6d4)"
                        : "rgba(255,255,255,.15)",
                  }}
                />
              ),
            )}
          </div>

          {/* ── Bottom CTA ── */}
          <div
            className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-7 rounded-3xl"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.10)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                Ready to book with Dr. Sarah Lee?
              </h3>
              <p className="font-nunito text-gray-400 text-sm">
                Talk to our care coordinator — we'll get you an appointment in
                minutes.
              </p>
            </div>
            <div className="flex gap-3 shrink-0 flex-wrap justify-center">
              <a
                href="#"
                className="font-nunito font-bold text-white px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#0d9488,#06b6d4)",
                  boxShadow: "0 8px 24px rgba(13,148,136,.35)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Book Appointment
              </a>
              <a
                href="#"
                className="font-nunito font-bold text-teal-300 px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all hover:bg-white/10"
                style={{ border: "1.5px solid rgba(94,234,212,.30)" }}
              >
                View All Specialities
                <svg
                  className="w-4 h-4"
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
