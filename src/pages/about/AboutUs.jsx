import React, { useState } from "react";

/**
 * Google Fonts (already in index.css):
 * Playfair Display + Nunito Sans
 */

const doctor = {
  name: "Dr. Sarah Lee",
  title: "Senior Physician — General & Internal Medicine",
  tagline: "Compassionate Care for Every Patient, Every Day",
  image:
    "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
  department: "General Medicine & Internal Medicine",
  hospital: "MediCare General Hospital",
  location: "Dhaka, Bangladesh",
  languages: ["English", "Hindi", "Bangla"],
  rating: 4.9,
  reviews: 3210,
  experience: 10,
  patients: "5000+",
  consultCount: "10,000+",
  research: "38",
  bio: "Dr. Sarah Lee is a board-certified physician specialising in General and Internal Medicine with over 10 years of comprehensive clinical experience. A graduate of the University of Chicago Pritzker School of Medicine and residency-trained at Mayo Clinic, Dr. Sarah is known for his exceptional diagnostic ability and his warm, patient-centred approach to primary care.",
  bio2: "He manages a broad spectrum of adult health conditions — from chronic disease management including diabetes, hypertension, and respiratory illness, to acute infections, preventive health screenings, and complex multi-system disorders. Dr. Sarah's philosophy is simple: listen carefully, diagnose precisely, and treat with genuine compassion.",
  education: [
    {
      year: "2010–2016",
      degree: "MBBS — University of Chicago, Pritzker School of Medicine",
      icon: "🎓",
      color: "#0d9488",
    },
    {
      year: "2016–2018",
      degree: "Residency in Internal Medicine — Mayo Clinic, Rochester",
      icon: "🏥",
      color: "#0891b2",
    },
    {
      year: "2018–2020",
      degree: "Fellowship in General Medicine — Johns Hopkins Hospital",
      icon: "🩺",
      color: "#7c3aed",
    },
    {
      year: "2020–2022",
      degree: "Advanced Clinical Research — Cleveland Clinic",
      icon: "🔬",
      color: "#059669",
    },
  ],
  expertise: [
    { label: "Chronic Disease Management (Diabetes, BP)", pct: 98 },
    { label: "Preventive Health & Screenings", pct: 97 },
    { label: "Acute Infection & Fever Diagnosis", pct: 96 },
    { label: "Respiratory & Pulmonary Conditions", pct: 94 },
    { label: "Geriatric & Senior Care", pct: 93 },
    { label: "Mental Health & Lifestyle Medicine", pct: 91 },
  ],
  awards: [
    {
      title: "America's Top Doctor",
      org: "Castle Connolly",
      year: "2015–2024",
      icon: "🏆",
    },
    {
      title: "Best General Physician — IL",
      org: "Chicago Magazine",
      year: "2022 & 2024",
      icon: "🌟",
    },
    {
      title: "Patient Empathy Award",
      org: "AMA Foundation",
      year: "2020",
      icon: "❤️",
    },
    {
      title: "Patient Choice Award",
      org: "Healthgrades",
      year: "6× Recipient",
      icon: "🩺",
    },
  ],
  publications: [
    {
      title: "Early Detection of Type 2 Diabetes in Urban Populations",
      journal: "NEJM, 2023",
    },
    {
      title: "Preventive Screening Protocols for Adults Over 40",
      journal: "JAMA, 2022",
    },
    {
      title: "AI-Assisted Diagnosis in Primary Care Settings",
      journal: "BMJ, 2021",
    },
  ],
  slots: ["Mon", "Tue", "Thu", "Sat"],
  slotTime: "8:00 AM – 2:00 PM",
  consultFee: "$180",
};

function Stars({ n = 5 }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("about");
  const tabs = ["about", "expertise", "education", "awards", "publications"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');

        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-nunito   { font-family: 'Nunito Sans', sans-serif; }

        /* ── HERO BG ── */
        .about-hero-bg {
          background: linear-gradient(160deg, #0f2027 0%, #0d2d2a 35%, #1a3a4a 65%, #0f2a35 100%);
          position: relative; overflow: hidden;
        }
        .about-hero-bg::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 5%  10%,  rgba(13,148,136,.22) 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at 95%  5%,  rgba(6,182,212,.14)  0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 95%,  rgba(16,185,129,.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 0%  90%,  rgba(99,102,241,.08) 0%, transparent 55%);
        }

        /* ── BODY BG ── */
        .about-body-bg {
          background-color: #f8fffe;
          background-image:
            radial-gradient(ellipse 55% 35% at 0%   0%,   rgba(13,148,136,.08) 0%, transparent 60%),
            radial-gradient(ellipse 45% 30% at 100% 100%, rgba(6,182,212,.07)  0%, transparent 55%);
        }

        /* ── Doctor image frame ── */
        .doc-frame {
          position: relative;
          border-radius: 2.5rem 2.5rem 40% 40% / 2.5rem 2.5rem 30% 30%;
          overflow: hidden;
          border: 4px solid rgba(255,255,255,.12);
          box-shadow:
            0 40px 80px rgba(0,0,0,.45),
            0 0 0 1px rgba(13,148,136,.25),
            inset 0 1px 0 rgba(255,255,255,.10);
        }
        .doc-frame::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(13,148,136,.40) 0%, transparent 50%);
          pointer-events: none;
        }

        /* ── Floating glass cards ── */
        .float-card {
          background: rgba(255,255,255,.10);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 1.25rem;
          box-shadow: 0 8px 32px rgba(0,0,0,.20);
        }

        /* ── Section card ── */
        .section-card {
          background: white;
          border-radius: 1.5rem;
          border: 1px solid rgba(229,231,235,.7);
          box-shadow: 0 4px 24px rgba(13,148,136,.07), 0 1px 4px rgba(0,0,0,.04);
          overflow: hidden;
        }

        /* ── Tab nav ── */
        .tab-btn {
          padding: 10px 20px; border-radius: 999px;
          font-size: 13px; font-weight: 700;
          transition: all .18s; white-space: nowrap; cursor: pointer;
          border: 1.5px solid transparent; text-transform: capitalize;
        }
        .tab-btn.active {
          background: linear-gradient(135deg,#0d9488,#0891b2);
          color: white; box-shadow: 0 4px 16px rgba(13,148,136,.30);
        }
        .tab-btn.inactive {
          color: #6b7280; border-color: rgba(13,148,136,.18);
          background: rgba(255,255,255,.8);
        }
        .tab-btn.inactive:hover { border-color: #0d9488; color: #0d9488; background: rgba(13,148,136,.04); }

        /* ── Skill bar ── */
        .skill-track {
          height: 7px; border-radius: 999px;
          background: rgba(13,148,136,.10); overflow: hidden;
        }
        .skill-fill {
          height: 100%; border-radius: 999px;
          background: linear-gradient(90deg,#0d9488,#06b6d4);
          box-shadow: 0 0 8px rgba(13,148,136,.35);
        }

        /* ── Timeline ── */
        .timeline-line {
          position: absolute; left: 19px; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom,#0d9488,#06b6d4,rgba(13,148,136,.10));
        }
        .timeline-dot {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          border: 2px solid rgba(255,255,255,.8);
          box-shadow: 0 4px 14px rgba(13,148,136,.25);
          position: relative; z-index: 2;
          background: white;
        }

        /* ── Award card ── */
        .award-card {
          background: white; border-radius: 1.25rem;
          border: 1px solid rgba(229,231,235,.8);
          box-shadow: 0 4px 18px rgba(13,148,136,.07);
          transition: transform .2s, box-shadow .2s; overflow: hidden;
        }
        .award-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(13,148,136,.14); }

        /* ── Grad text ── */
        .grad-text {
          background: linear-gradient(135deg,#0d9488,#0891b2);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .grad-text-light {
          background: linear-gradient(135deg,#5eead4,#67e8f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* Book button */
        .book-btn {
          background: linear-gradient(135deg,#0d9488,#06b6d4);
          box-shadow: 0 8px 28px rgba(13,148,136,.38);
          transition: transform .15s, box-shadow .15s;
        }
        .book-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(13,148,136,.45); }
        .book-btn:active { transform: translateY(0); }

        /* Slot pill */
        .slot-pill {
          background: linear-gradient(135deg,rgba(13,148,136,.10),rgba(6,182,212,.10));
          border: 1px solid rgba(13,148,136,.22);
          color: #0d9488; font-size: 11px; font-weight: 700;
          padding: 3px 10px; border-radius: 999px;
        }

        /* Publication row */
        .pub-row {
          border-left: 3px solid;
          border-image: linear-gradient(to bottom,#0d9488,#06b6d4) 1;
          padding-left: 16px;
        }

        /* Decorative arcs */
        .deco-arc {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.05);
          pointer-events: none;
        }

        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.6); }
          50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        .live-dot {
          width: 9px; height: 9px; border-radius: 50%; background: #10b981;
          animation: dotPulse 2s ease infinite; flex-shrink: 0;
        }

        .tab-scroll {
          display: flex; gap: 8px; overflow-x: auto;
          scrollbar-width: none; -ms-overflow-style: none; padding-bottom: 2px;
        }
        .tab-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — DARK DEEP TEAL
      ══════════════════════════════════════════════════════ */}
      <section
        className="about-hero-bg font-nunito relative"
        style={{ paddingTop: "84px" }}
      >
        {/* Decorative arcs */}
        <div
          className="deco-arc"
          style={{ width: 600, height: 600, top: -200, right: -150 }}
        />
        <div
          className="deco-arc"
          style={{ width: 400, height: 400, bottom: -100, left: -80 }}
        />
        <div className="pointer-events-none absolute top-0 right-0 opacity-[0.06]">
          <svg width="520" height="520" viewBox="0 0 520 520" fill="none">
            <circle cx="520" cy="0" r="320" stroke="white" strokeWidth="80" />
            <circle cx="520" cy="0" r="190" stroke="#5eead4" strokeWidth="40" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-end">
            {/* ── LEFT: Doctor Info ── */}
            <div className="pb-14 lg:pb-20 space-y-7">
              <div>
                <h1 className="font-playfair text-4xl sm:text-5xl xl:text-[3.6rem] font-bold text-white leading-[1.06] tracking-tight mb-3">
                  {doctor.name}
                </h1>
                <p className="font-nunito text-teal-300 text-lg font-semibold tracking-wide">
                  {doctor.title}
                </p>
                <p className="font-nunito text-white/45 text-sm italic mt-1.5 font-light">
                  "{doctor.tagline}"
                </p>
              </div>

              {/* Rating + Location */}
              <div className="flex flex-wrap gap-5 items-center">
                <div className="flex items-center gap-2">
                  <Stars n={5} />
                  <span className="font-playfair text-xl font-bold text-white">
                    {doctor.rating}
                  </span>
                  <span className="font-nunito text-white/45 text-sm">
                    ({doctor.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-white/55 text-sm">
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
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-nunito">{doctor.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/55 text-sm">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="font-nunito">{doctor.hospital}</span>
                </div>
              </div>

              {/* Language pills */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-nunito text-xs text-white/40 font-semibold uppercase tracking-widest">
                  Languages:
                </span>
                {doctor.languages.map((l) => (
                  <span
                    key={l}
                    className="font-nunito text-xs font-semibold text-teal-200 bg-teal-500/15 border border-teal-500/20 px-3 py-1 rounded-full"
                  >
                    {l}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    val: `${doctor.experience}+`,
                    label: "Years Experience",
                    icon: "⏱️",
                  },
                  {
                    val: doctor.patients,
                    label: "Patients Treated",
                    icon: "👥",
                  },
                  {
                    val: doctor.consultCount,
                    label: "Consultations Done",
                    icon: "🩺",
                  },
                ].map((s, i) => (
                  <div key={i} className="float-card p-4 text-center">
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="font-playfair text-2xl font-bold grad-text-light">
                      {s.val}
                    </div>
                    <div className="font-nunito text-[10px] text-white/45 font-semibold mt-0.5 leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="book-btn font-nunito font-bold text-white px-8 py-3.5 rounded-2xl text-sm flex items-center gap-2">
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
                </button>
                <button
                  className="font-nunito font-bold text-teal-300 px-7 py-3.5 rounded-2xl text-sm flex items-center gap-2 transition-all hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(94,234,212,.25)" }}
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
                      d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Video Consult
                </button>
              </div>
            </div>

            {/* ── RIGHT: Doctor Image ── */}
            <div className="relative flex justify-center lg:justify-end pb-0">
              {/* Glow behind image */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full opacity-25 blur-3xl"
                style={{
                  background: "radial-gradient(circle,#14b8a6,#06b6d4)",
                }}
              />

              {/* Main image */}
              <div className="doc-frame relative z-10 w-[280px] sm:w-[320px] lg:w-[360px] h-[380px] sm:h-[430px] lg:h-[480px]">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating: available slots */}
              <div className="float-card absolute bottom-10 -left-4 sm:-left-12 z-20 p-3.5 min-w-[168px]">
                <p className="font-nunito text-[10px] text-white/50 font-bold uppercase tracking-widest mb-2">
                  Available Days
                </p>
                <div className="flex gap-1.5 flex-wrap mb-2">
                  {doctor.slots.map((d) => (
                    <span
                      key={d}
                      className="text-[11px] font-bold text-teal-200 bg-teal-500/20 border border-teal-500/25 px-2 py-0.5 rounded-full"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <p className="font-nunito text-[11px] text-white/45">
                  🕐 {doctor.slotTime}
                </p>
              </div>

              {/* Floating: research papers */}
              <div className="float-card absolute top-8 -right-2 sm:-right-8 z-20 px-4 py-3 text-center">
                <p className="font-playfair text-3xl font-bold grad-text-light">
                  {doctor.research}
                </p>
                <p className="font-nunito text-[10px] text-white/50 font-semibold mt-0.5">
                  Research
                  <br />
                  Papers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "70px", display: "block" }}
          >
            <path
              d="M0 0 Q360 70 720 35 Q1080 0 1440 55 L1440 70 L0 70 Z"
              fill="#f8fffe"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BODY
      ══════════════════════════════════════════════════════ */}
      <section className="about-body-bg font-nunito py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="tab-scroll mb-10 justify-center flex-wrap gap-2 hidden sm:flex">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`tab-btn ${activeTab === t ? "active" : "inactive"}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          {/* <div className="tab-scroll sm:hidden mb-8">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`tab-btn ${activeTab === t ? "active" : "inactive"}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div> */}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* ── MAIN CONTENT ── */}
            <div className="lg:col-span-2 space-y-8">
              {/* ABOUT */}
              {activeTab === "about" && (
                <div className="section-card p-7 sm:p-9">
                  <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    About Dr. Carter
                  </div>
                  <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    Two Decades of{" "}
                    <span className="grad-text italic">Trusted</span>
                    <br />
                    General Medicine
                  </h2>
                  <div className="border-l-4 border-teal-400 pl-5 mb-7 py-1">
                    <p className="font-playfair text-xl italic text-gray-600 font-medium leading-relaxed">
                      "{doctor.tagline}"
                    </p>
                  </div>
                  <p className="font-nunito text-gray-600 text-base leading-relaxed mb-5">
                    {doctor.bio}
                  </p>
                  <p className="font-nunito text-gray-500 text-base leading-relaxed">
                    {doctor.bio2}
                  </p>
                  <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Department",
                        value: doctor.department,
                        icon: "🏥",
                      },
                      {
                        label: "Hospital / Clinic",
                        value: doctor.hospital,
                        icon: "🏢",
                      },
                      {
                        label: "Specialization",
                        value: "General & Internal Medicine",
                        icon: "🩺",
                      },
                      {
                        label: "Research Papers",
                        value: `${doctor.research} Published Works`,
                        icon: "📄",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                      >
                        <span className="text-xl shrink-0 mt-0.5">
                          {item.icon}
                        </span>
                        <div>
                          <p className="font-nunito text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {item.label}
                          </p>
                          <p className="font-nunito text-sm font-semibold text-gray-800 mt-0.5">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EXPERTISE */}
              {activeTab === "expertise" && (
                <div className="section-card p-7 sm:p-9">
                  <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
                    🩺 Clinical Expertise
                  </div>
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">
                    Areas of <span className="grad-text italic">Mastery</span>
                  </h2>
                  <div className="space-y-6">
                    {doctor.expertise.map((e, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-nunito text-sm font-semibold text-gray-800">
                            {e.label}
                          </span>
                          <span className="font-playfair text-base font-bold grad-text">
                            {e.pct}%
                          </span>
                        </div>
                        <div className="skill-track">
                          <div
                            className="skill-fill"
                            style={{ width: `${e.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EDUCATION */}
              {activeTab === "education" && (
                <div className="section-card p-7 sm:p-9">
                  <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
                    🎓 Education & Training
                  </div>
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-10">
                    Academic <span className="grad-text italic">Journey</span>
                  </h2>
                  <div className="relative pl-12">
                    <div className="timeline-line" />
                    <div className="space-y-8">
                      {doctor.education.map((e, i) => (
                        <div key={i} className="flex gap-5 items-start">
                          <div
                            className="timeline-dot -ml-12"
                            style={{
                              background: `linear-gradient(135deg,${e.color}22,${e.color}10)`,
                              borderColor: `${e.color}30`,
                            }}
                          >
                            <span className="text-lg">{e.icon}</span>
                          </div>
                          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-5">
                            <span
                              className="font-nunito text-[11px] font-bold text-white px-3 py-1 rounded-full"
                              style={{
                                background: `linear-gradient(135deg,${e.color},${e.color}cc)`,
                              }}
                            >
                              {e.year}
                            </span>
                            <p className="font-nunito font-bold text-gray-800 text-sm mt-3 leading-snug">
                              {e.degree}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* AWARDS */}
              {activeTab === "awards" && (
                <div className="section-card p-7 sm:p-9">
                  <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
                    🏆 Awards & Recognition
                  </div>
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">
                    Recognised{" "}
                    <span className="grad-text italic">Excellence</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {doctor.awards.map((a, i) => (
                      <div key={i} className="award-card p-5">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                            style={{
                              background:
                                "linear-gradient(135deg,rgba(13,148,136,.08),rgba(6,182,212,.08))",
                              border: "1px solid rgba(13,148,136,.15)",
                            }}
                          >
                            {a.icon}
                          </div>
                          <div>
                            <p className="font-playfair font-bold text-gray-900 text-base leading-tight">
                              {a.title}
                            </p>
                            <p className="font-nunito text-xs text-teal-600 font-semibold mt-1">
                              {a.org}
                            </p>
                            <p className="font-nunito text-[11px] text-gray-400 mt-0.5">
                              {a.year}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PUBLICATIONS */}
              {activeTab === "publications" && (
                <div className="section-card p-7 sm:p-9">
                  <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
                    📄 Research & Publications
                  </div>
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">
                    Published <span className="grad-text italic">Research</span>
                  </h2>
                  <div className="space-y-6">
                    {doctor.publications.map((p, i) => (
                      <div
                        key={i}
                        className="pub-row"
                        style={{
                          borderColor: i % 2 === 0 ? "#0d9488" : "#06b6d4",
                        }}
                      >
                        <p className="font-playfair font-bold text-gray-900 text-base leading-snug mb-1">
                          {p.title}
                        </p>
                        <p className="font-nunito text-xs text-teal-600 font-semibold">
                          {p.journal}
                        </p>
                        <button className="font-nunito text-[11px] text-gray-400 hover:text-teal-600 font-semibold mt-2 flex items-center gap-1 transition-colors">
                          View Paper
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <div
                      className="mt-4 p-5 rounded-2xl text-center"
                      style={{
                        background:
                          "linear-gradient(135deg,rgba(13,148,136,.06),rgba(6,182,212,.06))",
                        border: "1px dashed rgba(13,148,136,.20)",
                      }}
                    >
                      <p className="font-playfair text-4xl font-bold grad-text mb-1">
                        {doctor.research}
                      </p>
                      <p className="font-nunito text-sm text-gray-500 font-semibold">
                        Total Published Works
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <div className="space-y-6">
              {/* Book card */}
              <div className="section-card p-6 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: "linear-gradient(90deg,#0d9488,#06b6d4)",
                  }}
                />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-teal-100 shrink-0 shadow-md">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-nunito font-bold text-gray-900 text-sm leading-tight">
                      {doctor.name}
                    </p>
                    <p className="font-nunito text-teal-600 text-xs font-semibold">
                      General Medicine
                    </p>
                    <Stars n={5} />
                  </div>
                </div>
                <div className="mb-5 p-4 rounded-xl bg-teal-50 border border-teal-100">
                  <p className="font-nunito text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-2">
                    Next Available
                  </p>
                  <div className="flex gap-1.5 flex-wrap mb-2">
                    {doctor.slots.map((d) => (
                      <span key={d} className="slot-pill">
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="font-nunito text-xs font-semibold text-gray-600">
                    🕐 {doctor.slotTime}
                  </p>
                </div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-nunito text-sm font-semibold text-gray-500">
                    Consultation Fee
                  </span>
                  <span className="font-playfair text-2xl font-bold grad-text">
                    {doctor.consultFee}
                  </span>
                </div>
                <button className="book-btn w-full font-nunito font-bold text-white py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 mb-3">
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
                </button>
                <button className="w-full font-nunito font-bold text-teal-700 py-3 rounded-xl text-sm border border-teal-200 hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
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
                      d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Video Consultation
                </button>
              </div>

              {/* Quick stats */}
              <div className="section-card p-6">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                  At a Glance
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Experience",
                      val: `${doctor.experience} Years`,
                      icon: "⏱️",
                      color: "#0d9488",
                    },
                    {
                      label: "Patients Treated",
                      val: doctor.patients,
                      icon: "👥",
                      color: "#0891b2",
                    },
                    {
                      label: "Total Consultations",
                      val: doctor.consultCount,
                      icon: "🩺",
                      color: "#059669",
                    },
                    {
                      label: "Research Papers",
                      val: doctor.research,
                      icon: "📄",
                      color: "#7c3aed",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.icon}</span>
                        <span className="font-nunito text-sm text-gray-600 font-semibold">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className="font-playfair font-bold text-sm"
                        style={{
                          background: `linear-gradient(135deg,${item.color},#06b6d4)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
