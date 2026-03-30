import React, { useState } from "react";

const stats = [
  { value: "1K+", label: "Patients Treated" },
  { value: "12+", label: "Years Experience" },
  { value: "98%", label: "Success Rate" },
  { value: "24/7", label: "Support Available" },
];

const specialties = [
  { icon: "🫀", label: "Cardiology" },
  { icon: "🧠", label: "Neurology" },
  { icon: "🦷", label: "Dental" },
  { icon: "👁️", label: "Ophthalmology" },
  { icon: "🦴", label: "Orthopedics" },
  { icon: "🩺", label: "General" },
];

const doctor = {
  src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  name: "Dr. Sarah Lee",
  specialty: "Cardiologist",
  rating: "4.9",
  reviews: "2,400+",
  slot: "Today 3 PM",
  avatar:
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  badge: "Medicine Specialist",
};

export default function HeroPage() {
  const [activeSpecialty, setActiveSpecialty] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-nunito   { font-family: 'Nunito Sans', sans-serif; }

        .hero-bg {
          background-color: #ecfdf5;
          background-image:
            radial-gradient(ellipse 72% 58% at 5%  5%,  rgba(13,148,136,.22)  0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 95% 8%,  rgba(6,182,212,.18)   0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 20% 55%, rgba(52,211,153,.14)  0%, transparent 60%),
            radial-gradient(ellipse 65% 50% at 90% 92%, rgba(16,185,129,.16)  0%, transparent 65%),
            radial-gradient(ellipse 45% 40% at 2%  95%, rgba(99,102,241,.08)  0%, transparent 55%),
            radial-gradient(ellipse 50% 30% at 52% 50%, rgba(20,184,166,.07)  0%, transparent 55%),
            radial-gradient(ellipse 35% 28% at 50% 0%,  rgba(56,189,248,.10)  0%, transparent 60%);
        }

        .hero-diagonal {
          position: absolute; inset: 0;
          background: linear-gradient(128deg, transparent 0%, rgba(13,148,136,.05) 25%, rgba(6,182,212,.07) 48%, rgba(16,185,129,.05) 72%, transparent 100%);
          pointer-events: none;
        }

        .hero-right-panel {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 50%;
          background: linear-gradient(148deg, rgba(204,251,241,.55) 0%, rgba(186,230,253,.45) 38%, rgba(167,243,208,.38) 72%, rgba(240,253,250,.20) 100%);
          border-bottom-left-radius: 55% 28%;
          pointer-events: none;
        }

        .hero-top-strip {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(90deg, #0d9488, #06b6d4, #34d399, #06b6d4, #0d9488);
        }

        .glass-card {
          background: rgba(255,255,255,.78);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,.65);
          box-shadow: 0 8px 28px rgba(13,148,136,.10), 0 1px 3px rgba(0,0,0,.04);
        }

        .btn-gradient {
          background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%);
          box-shadow: 0 8px 24px rgba(13,148,136,.30);
          transition: box-shadow .2s, transform .15s;
        }
        .btn-gradient:hover { box-shadow: 0 12px 32px rgba(13,148,136,.40); transform: translateY(-1px); }
        .btn-gradient:active { transform: translateY(0); }

        .btn-outline {
          border: 1.5px solid rgba(13,148,136,.35);
          background: rgba(255,255,255,.70);
          backdrop-filter: blur(8px);
          transition: border-color .2s, background .2s, transform .15s;
        }
        .btn-outline:hover { border-color: #0d9488; background: rgba(255,255,255,.90); transform: translateY(-1px); }

        .pill-inactive:hover { border-color: #0d9488; color: #0d9488; background: rgba(255,255,255,.90); }

        .stats-bar {
          background: linear-gradient(120deg, rgba(240,253,250,.96) 0%, rgba(236,254,255,.96) 50%, rgba(240,253,250,.96) 100%);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,.85);
          box-shadow: 0 8px 40px rgba(13,148,136,.10), 0 1px 4px rgba(0,0,0,.03);
        }

        .doctor-glow {
          position: absolute;
          inset: -20px;
          border-radius: 45% 55% 50% 50% / 45% 45% 55% 55%;
          background: radial-gradient(ellipse at center, rgba(94,234,212,.35) 0%, rgba(56,189,248,.20) 45%, transparent 72%);
          filter: blur(28px);
          pointer-events: none;
        }

        .ring-outer { border: 2px dashed rgba(13,148,136,.22); border-radius: 50%; }
        .ring-inner { border: 1px solid rgba(6,182,212,.18); border-radius: 50%; }

        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.5); }
          50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .live-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #10b981;
          animation: dotPulse 2s ease infinite;
          display: inline-block;
          flex-shrink: 0;
        }

        .card-hover { transition: transform .2s ease, box-shadow .2s ease; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(13,148,136,.14); }

        .medicine-badge {
          background: linear-gradient(135deg, rgba(13,148,136,.15), rgba(6,182,212,.15));
          border: 1px solid rgba(13,148,136,.25);
          color: #0d9488;
        }
      `}</style>

      <section
        className="hero-bg font-nunito relative min-h-screen overflow-hidden"
        style={{ paddingTop: "84px" }}
      >
        <div className="hero-top-strip" />
        <div className="hero-diagonal" />
        <div className="hero-right-panel hidden lg:block" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">
            {/* ══════════════ LEFT ══════════════ */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2.5 bg-white/75 border border-teal-200 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm backdrop-blur-sm">
                <span className="live-dot" />
                Trusted by thousands of patients worldwide
              </div>

              <div>
                <h1 className="font-playfair text-5xl sm:text-6xl xl:text-[4.4rem] font-bold leading-[1.07] tracking-tight text-gray-900">
                  Your Health,{" "}
                  <span
                    className="italic"
                    style={{
                      background: "linear-gradient(135deg,#0d9488,#0891b2)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Our
                  </span>
                  <br />
                  <span className="relative inline-block">
                    Priority
                    <svg
                      className="absolute -bottom-3 left-0 w-full"
                      viewBox="0 0 340 16"
                      fill="none"
                    >
                      <path
                        d="M2 12 Q85 4 170 11 Q255 18 338 8"
                        stroke="url(#lineGrad)"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="lineGrad"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#0d9488" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </h1>
              </div>

              <p
                className="font-nunito text-gray-500 text-lg sm:text-xl leading-relaxed max-w-lg"
                style={{ fontWeight: 400 }}
              >
                Connect with{" "}
                <span className="text-gray-800 font-semibold">
                  Dr. Sarah Lee
                </span>{" "}
                — a trusted medicine specialist. Book appointments, get expert
                diagnoses, and receive personalised care — all from home.
              </p>

              <div className="space-y-3">
                <p className="font-nunito text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Popular Specialties
                </p>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSpecialty(i)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200
                        ${activeSpecialty === i ? "text-white border-transparent shadow-md shadow-teal-200" : "pill-inactive bg-white/70 text-gray-600 border-gray-200 backdrop-blur-sm"}`}
                      style={
                        activeSpecialty === i
                          ? {
                              background:
                                "linear-gradient(135deg,#0d9488,#0891b2)",
                            }
                          : {}
                      }
                    >
                      <span>{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <a
                  href="#"
                  className="btn-gradient font-nunito font-bold text-white px-8 py-4 rounded-2xl text-base flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#0d9488,#0891b2)",
                  }}
                >
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Book Appointment
                </a>
                <a
                  href="#"
                  className="btn-outline font-nunito font-semibold text-teal-700 flex items-center gap-2.5 px-6 py-4 rounded-2xl text-base"
                >
                  <span
                    className="w-8 h-8 flex items-center justify-center rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(13,148,136,.12),rgba(6,182,212,.12))",
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-teal-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Watch How It Works
                </a>
              </div>
            </div>

            {/* ══════════════ RIGHT — SINGLE DOCTOR ══════════════ */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Decorative rings */}
              <div className="ring-outer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] lg:w-[460px] lg:h-[460px]" />
              <div className="ring-inner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] lg:w-[396px] lg:h-[396px]" />

              <div className="relative">
                <div className="doctor-glow" />

                {/* ── Doctor image ── */}
                <div
                  className="relative z-10 w-[290px] h-[370px] sm:w-[340px] sm:h-[435px] lg:w-[385px] lg:h-[488px] rounded-[2.5rem] overflow-hidden border-[5px] border-white"
                  style={{
                    boxShadow:
                      "0 25px 60px rgba(13,148,136,.22), 0 8px 20px rgba(0,0,0,.06)",
                  }}
                >
                  <img
                    src={doctor.src}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Bottom gradient fade */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-2/5"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(13,148,136,.42),transparent)",
                    }}
                  />

                  {/* Medicine badge inside image */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
                    <div className="medicine-badge font-nunito text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap backdrop-blur-sm">
                      💊 Medicine Specialist
                    </div>
                  </div>
                </div>

                {/* ── Floating card 1 — Doctor info ── */}
                <div className="glass-card card-hover absolute -left-5 sm:-left-14 top-10 rounded-2xl p-3 min-w-[168px] z-20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow shrink-0">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-nunito font-bold text-gray-800 text-sm leading-tight">
                        {doctor.name}
                      </p>
                      <p className="font-nunito text-teal-600 text-xs font-semibold">
                        {doctor.specialty} ⭐ {doctor.rating}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="font-nunito text-[11px] text-gray-400 font-medium">
                      Next slot
                    </span>
                    <span className="font-nunito text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {doctor.slot}
                    </span>
                  </div>
                </div>

                {/* ── Floating card 2 — Rating ── */}
                <div className="glass-card card-hover absolute -right-1 sm:-right-10 top-8 rounded-2xl px-3.5 py-2.5 z-20">
                  <p className="font-nunito text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Patient Rating
                  </p>
                  <div className="flex items-end gap-1.5 mt-0.5">
                    <span
                      className="font-playfair text-3xl font-bold"
                      style={{
                        background: "linear-gradient(135deg,#0d9488,#0891b2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {doctor.rating}
                    </span>
                    <span className="text-yellow-400 text-sm mb-1 tracking-tighter">
                      ★★★★★
                    </span>
                  </div>
                  <p className="font-nunito text-[10px] text-gray-400">
                    Based on {doctor.reviews} reviews
                  </p>
                </div>

                {/* ── Floating card 3 — Patients count (bottom right) ── */}
                <div className="glass-card card-hover absolute -right-1 sm:-right-10 bottom-16 rounded-2xl px-3.5 py-2.5 z-20">
                  <p className="font-nunito text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Patients Treated
                  </p>
                  <div className="flex items-end gap-1.5 mt-0.5">
                    <span
                      className="font-playfair text-2xl font-bold"
                      style={{
                        background: "linear-gradient(135deg,#0d9488,#0891b2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      1K+
                    </span>
                  </div>
                  <p className="font-nunito text-[10px] text-gray-400">
                    Happy &amp; recovered
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════ STATS BAR ══════════════ */}
          <div className="mt-20">
            <div className="stats-bar rounded-3xl overflow-hidden">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-teal-100/50 px-6 py-8">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center text-center px-4 ${i < 2 ? "pb-6 lg:pb-0" : "pt-6 lg:pt-0"}`}
                  >
                    <span
                      className="font-playfair text-4xl lg:text-5xl font-bold"
                      style={{
                        background: "linear-gradient(135deg,#0d9488,#0891b2)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {s.value}
                    </span>
                    <span className="font-nunito text-sm text-gray-500 font-semibold mt-1.5 tracking-wide">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
