import React, { useState, useEffect, useRef } from "react";

const specialties = [
  {
    id: 1,
    icon: "🫀",
    label: "Cardiology",
    desc: "Heart & Vascular Care",
    detail:
      "Expert diagnosis and treatment of heart conditions, hypertension, arrhythmias, and cardiovascular diseases.",
    patients: "100+",
    tag: "Most Booked",
    tagColor: "from-rose-500 to-pink-500",
    grad: "from-rose-50 via-pink-50 to-rose-100",
    border: "border-rose-200",
    iconBg: "bg-rose-100",
    accent: "#e11d48",
    accentLight: "#fce7f3",
    dot: "bg-rose-400",
    hover: "hover:shadow-rose-200",
  },
  {
    id: 2,
    icon: "🧠",
    label: "Neurology",
    desc: "Brain & Nervous System",
    detail:
      "Comprehensive care for migraines, epilepsy, stroke, multiple sclerosis, and neurodegenerative disorders.",
    patients: "50+",
    tag: "Specialist",
    tagColor: "from-violet-500 to-purple-600",
    grad: "from-violet-50 via-purple-50 to-violet-100",
    border: "border-violet-200",
    iconBg: "bg-violet-100",
    accent: "#7c3aed",
    accentLight: "#ede9fe",
    dot: "bg-violet-400",
    hover: "hover:shadow-violet-200",
  },
  {
    id: 3,
    icon: "🦷",
    label: "Dental",
    desc: "Oral & Dental Health",
    detail:
      "From routine cleanings to advanced orthodontics, implants, and cosmetic dentistry — all under one roof.",
    patients: "20+",
    tag: "Popular",
    tagColor: "from-emerald-500 to-teal-500",
    grad: "from-emerald-50 via-teal-50 to-emerald-100",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    accent: "#059669",
    accentLight: "#d1fae5",
    dot: "bg-emerald-400",
    hover: "hover:shadow-emerald-200",
  },
  {
    id: 4,
    icon: "👁️",
    label: "Ophthalmology",
    desc: "Eye & Vision Care",
    detail:
      "LASIK surgery, cataract treatment, glaucoma management, and complete vision correction solutions.",
    patients: "200+",
    tag: "Precision",
    tagColor: "from-cyan-500 to-sky-500",
    grad: "from-cyan-50 via-sky-50 to-cyan-100",
    border: "border-cyan-200",
    iconBg: "bg-cyan-100",
    accent: "#0891b2",
    accentLight: "#cffafe",
    dot: "bg-cyan-400",
    hover: "hover:shadow-cyan-200",
  },
  {
    id: 5,
    icon: "🦴",
    label: "Orthopedics",
    desc: "Bones, Joints & Spine",
    detail:
      "Joint replacement, sports injuries, fracture care, and physical rehabilitation for complete mobility.",
    patients: "100+",
    tag: "Advanced",
    tagColor: "from-amber-500 to-orange-500",
    grad: "from-amber-50 via-orange-50 to-amber-100",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    accent: "#d97706",
    accentLight: "#fef3c7",
    dot: "bg-amber-400",
    hover: "hover:shadow-amber-200",
  },
  {
    id: 6,
    icon: "🩺",
    label: "General Medicine",
    desc: "Primary Healthcare",
    detail:
      "Preventive care, chronic disease management, health screenings, and complete family medicine services.",
    patients: "500+",
    tag: "Foundation",
    tagColor: "from-teal-500 to-green-500",
    grad: "from-teal-50 via-green-50 to-teal-100",
    border: "border-teal-200",
    iconBg: "bg-teal-100",
    accent: "#0d9488",
    accentLight: "#ccfbf1",
    dot: "bg-teal-400",
    hover: "hover:shadow-teal-200",
  },
  {
    id: 7,
    icon: "🧬",
    label: "Dermatology",
    desc: "Skin, Hair & Nails",
    detail:
      "Acne, eczema, psoriasis, skin cancer screening, cosmetic procedures, and advanced laser treatments.",
    patients: "100+",
    tag: "Cosmetic",
    tagColor: "from-pink-500 to-fuchsia-500",
    grad: "from-pink-50 via-fuchsia-50 to-pink-100",
    border: "border-pink-200",
    iconBg: "bg-pink-100",
    accent: "#db2777",
    accentLight: "#fce7f3",
    dot: "bg-pink-400",
    hover: "hover:shadow-pink-200",
  },
  {
    id: 8,
    icon: "🫁",
    label: "Pulmonology",
    desc: "Lungs & Respiratory",
    detail:
      "Asthma, COPD, sleep apnea, bronchitis, and advanced pulmonary function testing and therapy.",
    patients: "80+",
    tag: "Vital",
    tagColor: "from-sky-500 to-blue-500",
    grad: "from-sky-50 via-blue-50 to-sky-100",
    border: "border-sky-200",
    iconBg: "bg-sky-100",
    accent: "#0284c7",
    accentLight: "#e0f2fe",
    dot: "bg-sky-400",
    hover: "hover:shadow-sky-200",
  },
  {
    id: 9,
    icon: "👶",
    label: "Pediatrics",
    desc: "Child Healthcare",
    detail:
      "Newborn care, vaccinations, growth monitoring, developmental assessments, and adolescent medicine.",
    patients: "100+",
    tag: "Family",
    tagColor: "from-orange-400 to-amber-500",
    grad: "from-orange-50 via-amber-50 to-orange-100",
    border: "border-orange-200",
    iconBg: "bg-orange-100",
    accent: "#ea580c",
    accentLight: "#ffedd5",
    dot: "bg-orange-400",
    hover: "hover:shadow-orange-200",
  },
  {
    id: 10,
    icon: "🩻",
    label: "Radiology",
    desc: "Imaging & Diagnostics",
    detail:
      "MRI, CT scans, X-rays, ultrasound, and advanced imaging diagnostics with rapid result delivery.",
    patients: "50+",
    tag: "Diagnostic",
    tagColor: "from-green-500 to-emerald-600",
    grad: "from-green-50 via-emerald-50 to-green-100",
    border: "border-green-200",
    iconBg: "bg-green-100",
    accent: "#15803d",
    accentLight: "#dcfce7",
    dot: "bg-green-500",
    hover: "hover:shadow-green-200",
  },
  {
    id: 11,
    icon: "🧓",
    label: "Geriatrics",
    desc: "Senior & Elder Care",
    detail:
      "Holistic care for age-related conditions, dementia, fall prevention, and comprehensive senior wellness.",
    patients: "70+",
    tag: "Compassion",
    tagColor: "from-indigo-500 to-violet-500",
    grad: "from-indigo-50 via-violet-50 to-indigo-100",
    border: "border-indigo-200",
    iconBg: "bg-indigo-100",
    accent: "#4338ca",
    accentLight: "#e0e7ff",
    dot: "bg-indigo-400",
    hover: "hover:shadow-indigo-200",
  },
  {
    id: 12,
    icon: "🏥",
    label: "Surgery",
    desc: "General & Specialty",
    detail:
      "Minimally invasive laparoscopic surgery, emergency operations, and post-op rehabilitation programs.",
    patients: "50+",
    tag: "Expert",
    tagColor: "from-slate-600 to-gray-700",
    grad: "from-slate-50 via-gray-50 to-slate-100",
    border: "border-slate-200",
    iconBg: "bg-slate-100",
    accent: "#475569",
    accentLight: "#f1f5f9",
    dot: "bg-slate-400",
    hover: "hover:shadow-slate-200",
  },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function SpecialtyCard({ s, index, onClick, active }) {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      onClick={() => onClick(s)}
      className={`
        relative cursor-pointer rounded-3xl border ${s.border} bg-gradient-to-br ${s.grad}
        p-6 flex flex-col gap-4
        shadow-lg ${s.hover} hover:shadow-2xl
        transition-all duration-500 ease-out
        ${active ? "ring-2 scale-[1.02]" : "hover:-translate-y-2 hover:scale-[1.01]"}
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        group overflow-hidden
      `}
      style={{
        transitionDelay: inView ? `${(index % 4) * 80}ms` : "0ms",
        ringColor: active ? s.accent : "transparent",
      }}
    >
      {/* Decorative background circle */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 transition-all duration-500 group-hover:opacity-20 group-hover:scale-110"
        style={{ background: s.accent }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-5 transition-all duration-500 group-hover:opacity-15"
        style={{ background: s.accent }}
      />

      {/* Tag badge */}
      <div className="flex items-start justify-between">
        <span
          className={`font-nunito text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full bg-gradient-to-r ${s.tagColor} shadow-sm`}
        >
          {s.tag}
        </span>
        <div className={`w-2.5 h-2.5 rounded-full ${s.dot} animate-pulse`} />
      </div>

      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-2xl ${s.iconBg} flex items-center justify-center text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
      >
        {s.icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3
          className="font-playfair text-xl font-bold leading-tight mb-1"
          style={{ color: s.accent }}
        >
          {s.label}
        </h3>
        <p className="font-nunito text-sm font-semibold text-gray-500 mb-2">
          {s.desc}
        </p>
        <p className="font-nunito text-xs text-gray-400 leading-relaxed line-clamp-2">
          {s.detail}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/60">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          <span className="font-nunito text-xs text-gray-500 font-semibold">
            {s.patients} patients
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md transition-transform duration-300 group-hover:translate-x-1"
          style={{
            background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
          }}
        >
          →
        </div>
      </div>
    </div>
  );
}

export default function Specialties() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, 0.2);

  const filtered = specialties.filter(
    (s) =>
      s.label.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-nunito   { font-family: 'Nunito Sans', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-10px) rotate(1deg); }
          66%       { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(13,148,136,.5); }
          50%      { box-shadow: 0 0 0 6px rgba(13,148,136,0); }
        }

        .float-anim { animation: float 6s ease-in-out infinite; }
        .float-anim-2 { animation: float 8s ease-in-out infinite 1s; }
        .float-anim-3 { animation: float 7s ease-in-out infinite 2s; }

        .shimmer-text {
          background: linear-gradient(90deg, #0d9488, #06b6d4, #0d9488, #34d399, #0d9488);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .header-animate { animation: fadeSlideUp .8s cubic-bezier(.22,1,.36,1) both; }
        .header-animate-2 { animation: fadeSlideUp .8s cubic-bezier(.22,1,.36,1) .15s both; }
        .header-animate-3 { animation: fadeSlideUp .8s cubic-bezier(.22,1,.36,1) .3s both; }

        .modal-animate { animation: scaleIn .35s cubic-bezier(.22,1,.36,1) both; }

        .search-glow:focus {
          box-shadow: 0 0 0 3px rgba(13,148,136,.18), 0 8px 32px rgba(13,148,136,.10);
        }

        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #10b981;
          animation: dotPulse 2s ease infinite; flex-shrink: 0; display: inline-block;
        }

        .stat-card {
          background: rgba(255,255,255,.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.9);
        }

        .section-bg {
          background-color: #f0fdfa;
          background-image:
            radial-gradient(ellipse 70% 50% at 10% 0%,   rgba(13,148,136,.12) 0%, transparent 60%),
            radial-gradient(ellipse 55% 40% at 90% 10%,  rgba(6,182,212,.10)  0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 5%  90%,  rgba(52,211,153,.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 90%,  rgba(16,185,129,.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 50% 50%,  rgba(20,184,166,.05) 0%, transparent 60%);
        }

        .overlay-bg {
          position: fixed; inset: 0; z-index: 50;
          background: rgba(15,23,42,.65);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .modal-card {
          background: white;
          border-radius: 2rem;
          max-width: 520px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 40px 100px rgba(0,0,0,.25);
        }
        .modal-card::-webkit-scrollbar { width: 4px; }
        .modal-card::-webkit-scrollbar-thumb { background: #0d9488; border-radius: 4px; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <section className="section-bg font-nunito min-h-screen py-20 lg:py-36 relative overflow-hidden">
        {/* ── Floating decorative blobs ── */}
        <div
          className="float-anim pointer-events-none absolute top-10 left-8 w-20 h-20 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #0d9488, transparent)",
          }}
        />
        <div
          className="float-anim-2 pointer-events-none absolute top-32 right-16 w-14 h-14 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent)",
          }}
        />
        <div
          className="float-anim-3 pointer-events-none absolute bottom-20 left-20 w-16 h-16 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #34d399, transparent)",
          }}
        />
        <div
          className="float-anim pointer-events-none absolute bottom-32 right-10 w-24 h-24 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent)",
          }}
        />

        {/* ── Decorative SVG arcs ── */}
        <div className="pointer-events-none absolute top-0 right-0 opacity-[0.04]">
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
            <circle cx="500" cy="0" r="300" stroke="#0d9488" strokeWidth="80" />
            <circle cx="500" cy="0" r="180" stroke="#06b6d4" strokeWidth="40" />
          </svg>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 opacity-[0.04]">
          <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
            <circle cx="0" cy="380" r="240" stroke="#34d399" strokeWidth="60" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* ══ HEADER ══ */}
          <div ref={headerRef} className="text-center mb-16">
            {headerInView && (
              <>
                <div className="header-animate flex justify-center mb-5">
                  <span className="inline-flex items-center gap-2.5 bg-white/80 border border-teal-200 text-teal-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm">
                    <span className="live-dot" />
                    Medical Specialties
                  </span>
                </div>

                <h1 className="header-animate-2 font-playfair text-4xl sm:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-bold leading-[1.08] tracking-tight text-gray-900 mb-6">
                  Expert Care Across{" "}
                  <span className="shimmer-text italic">Every</span>
                  <br />
                  <span className="text-gray-900">Medical</span>{" "}
                  <span className="shimmer-text">Specialty</span>
                </h1>

                <p className="header-animate-3 font-nunito text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                  From routine check-ups to complex procedures — discover{" "}
                  <span className="font-bold text-gray-800">
                    12 specialties
                  </span>{" "}
                  with dedicated experts ready to provide world-class care.
                </p>

                {/* Stats row */}
                <div className="header-animate-3 flex flex-wrap justify-center gap-4 mb-10">
                  {[
                    { val: "12+", label: "Specialties" },
                    { val: "1K+", label: "Patients Served" },
                    { val: "98%", label: "Satisfaction" },
                    { val: "24/7", label: "Available" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="stat-card flex items-center gap-3 px-5 py-3 rounded-2xl shadow-sm"
                    >
                      <span
                        className="font-playfair text-2xl font-bold"
                        style={{
                          background: "linear-gradient(135deg,#0d9488,#0891b2)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {s.val}
                      </span>
                      <span className="font-nunito text-xs text-gray-500 font-semibold">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Search bar */}
                <div className="header-animate-3 max-w-md mx-auto relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search specialties…"
                    className="search-glow font-nunito w-full pl-12 pr-5 py-4 rounded-2xl bg-white/85 border border-teal-100 text-gray-700 placeholder-gray-400 text-sm font-medium outline-none transition-all duration-300 backdrop-blur-sm shadow-md"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ══ CARDS GRID ══ */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
              {filtered.map((s, i) => (
                <SpecialtyCard
                  key={s.id}
                  s={s}
                  index={i}
                  onClick={setSelected}
                  active={selected?.id === s.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-playfair text-2xl font-bold text-gray-700 mb-2">
                No specialties found
              </p>
              <p className="font-nunito text-gray-400 text-sm">
                Try a different search term
              </p>
            </div>
          )}

          {/* ══ BOTTOM CTA BANNER ══ */}
          <div
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8"
            style={{
              background:
                "linear-gradient(135deg, #0f2d2a 0%, #0d3d3a 40%, #0a3545 100%)",
              boxShadow: "0 20px 60px rgba(13,148,136,.25)",
            }}
          >
            {/* Background glow orbs */}
            <div
              className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-15"
              style={{
                background: "radial-gradient(circle,#0d9488,transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-12 -right-12 w-48 h-48 rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle,#06b6d4,transparent)",
              }}
            />

            <div className="relative z-10">
              <p className="font-nunito text-teal-300 text-xs font-bold uppercase tracking-widest mb-2">
                💊 Dr. Sarah Lee · Medicine Specialist
              </p>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="font-nunito text-gray-400 text-sm leading-relaxed max-w-md">
                Talk directly with Dr. Sarah Lee — she'll guide you to the right
                specialist and care plan in minutes.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#"
                className="font-nunito font-bold text-white px-7 py-3.5 rounded-2xl text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-2xl whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg,#0d9488,#06b6d4)",
                  boxShadow: "0 8px 28px rgba(13,148,136,.40)",
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
                className="font-nunito font-bold text-teal-300 px-7 py-3.5 rounded-2xl text-sm flex items-center gap-2 transition-all duration-200 hover:bg-white/10 whitespace-nowrap"
                style={{ border: "1.5px solid rgba(94,234,212,.28)" }}
              >
                Chat with Us
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MODAL ══ */}
      {selected && (
        <div className="overlay-bg" onClick={() => setSelected(null)}>
          <div
            className="modal-card modal-animate"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className={`relative p-8 bg-gradient-to-br ${selected.grad} border-b ${selected.border} rounded-t-[2rem]`}
            >
              {/* Decorative circle */}
              <div
                className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-15"
                style={{ background: selected.accent }}
              />

              <div className="relative z-10 flex items-start justify-between mb-4">
                <span
                  className={`font-nunito text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full bg-gradient-to-r ${selected.tagColor} shadow-sm`}
                >
                  {selected.tag}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div
                className={`relative z-10 w-20 h-20 rounded-3xl ${selected.iconBg} flex items-center justify-center text-4xl shadow-md mb-4`}
              >
                {selected.icon}
              </div>

              <h2
                className="relative z-10 font-playfair text-3xl font-bold leading-tight mb-1"
                style={{ color: selected.accent }}
              >
                {selected.label}
              </h2>
              <p className="relative z-10 font-nunito text-sm font-semibold text-gray-500">
                {selected.desc}
              </p>
            </div>

            {/* Modal body */}
            <div className="p-8">
              <p className="font-nunito text-gray-600 text-base leading-relaxed mb-6">
                {selected.detail}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-7">
                {[
                  { val: selected.patients, label: "Patients" },
                  { val: "4.9★", label: "Rating" },
                  { val: "24/7", label: "Available" },
                ].map((st, i) => (
                  <div
                    key={i}
                    className="text-center py-3 rounded-2xl"
                    style={{ background: selected.accentLight }}
                  >
                    <p
                      className="font-playfair text-xl font-bold"
                      style={{ color: selected.accent }}
                    >
                      {st.val}
                    </p>
                    <p className="font-nunito text-[11px] text-gray-500 font-semibold mt-0.5">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Doctor tag */}
              <div
                className="flex items-center gap-3 p-4 rounded-2xl mb-7"
                style={{
                  background: selected.accentLight,
                  border: `1px solid ${selected.accent}22`,
                }}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    alt="Dr. Sarah Lee"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p
                    className="font-nunito font-bold text-sm"
                    style={{ color: selected.accent }}
                  >
                    Dr. Sarah Lee
                  </p>
                  <p className="font-nunito text-xs text-gray-500">
                    Cardiologist · Medicine Specialist
                  </p>
                </div>
                <span
                  className="font-nunito text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                  style={{
                    background: `linear-gradient(135deg,${selected.accent},${selected.accent}bb)`,
                  }}
                >
                  Available
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex-1 font-nunito font-bold text-white py-3.5 rounded-2xl text-sm text-center transition-all hover:opacity-90 hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${selected.accent}, ${selected.accent}cc)`,
                    boxShadow: `0 8px 24px ${selected.accent}40`,
                  }}
                >
                  Book Appointment
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="font-nunito font-semibold text-gray-500 px-5 py-3.5 rounded-2xl text-sm border border-gray-200 hover:border-gray-300 hover:text-gray-700 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
