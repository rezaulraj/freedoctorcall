import React, { useState } from "react";

const stories = [
  {
    id: 1,
    name: "Amelia Richardson",
    age: 34,
    treatment: "Cardiology",
    treatmentIcon: "🫀",
    treatmentColor: "#0d9488",
    treatmentBg: "#f0fdfa",
    title: "A Second Chance at Life After My Heart Consultation",
    excerpt:
      "I was terrified when I received my diagnosis. But Dr. Sarah Lee walked me through every step with such patience and clarity. The online consultation was seamless, and six months later I'm hiking again — something I never thought possible.",
    date: "March 14, 2025",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    name: "Marcus Thompson",
    age: 52,
    treatment: "Online Consult",
    treatmentIcon: "💻",
    treatmentColor: "#0891b2",
    treatmentBg: "#ecfeff",
    title: "Got Expert Advice Without Leaving My Home",
    excerpt:
      "As someone with a busy schedule, finding time for doctor visits was always a challenge. Dr. Sarah Lee's video consultation was professional, thorough, and incredibly convenient. I had my answers within the hour.",
    date: "January 28, 2025",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
  {
    id: 3,
    name: "Sofia Hernandez",
    age: 29,
    treatment: "Follow-up Care",
    treatmentIcon: "📋",
    treatmentColor: "#059669",
    treatmentBg: "#f0fdf4",
    title: "Regular Check-ins That Actually Made a Difference",
    excerpt:
      "Dr. Sarah Lee's follow-up care is unmatched. She remembered every detail of my case and adjusted my treatment plan accordingly. Feeling genuinely cared for by a doctor online was something I didn't expect.",
    date: "February 10, 2025",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
  {
    id: 4,
    name: "Daniel Park",
    age: 45,
    treatment: "Medicine Review",
    treatmentIcon: "💊",
    treatmentColor: "#7c3aed",
    treatmentBg: "#f5f3ff",
    title: "My Medication Plan Finally Makes Sense",
    excerpt:
      "I had been on multiple medications and felt completely lost. Dr. Sarah Lee reviewed everything clearly during our online session and simplified my entire routine. I feel more in control of my health than ever.",
    date: "December 5, 2024",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
  {
    id: 5,
    name: "Priya Nair",
    age: 38,
    treatment: "Diagnosis",
    treatmentIcon: "🩺",
    treatmentColor: "#0891b2",
    treatmentBg: "#ecfeff",
    title: "Accurate Diagnosis in Just One Video Call",
    excerpt:
      "I was skeptical about getting a proper diagnosis online. Dr. Sarah Lee proved me completely wrong. She was thorough, asked all the right questions, and had a clear diagnosis ready by the end of our call.",
    date: "November 19, 2024",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
  {
    id: 6,
    name: "James O'Brien",
    age: 61,
    treatment: "Preventive Care",
    treatmentIcon: "🛡️",
    treatmentColor: "#16a34a",
    treatmentBg: "#f0fdf4",
    title: "Early Detection That Changed Everything",
    excerpt:
      "A routine online check-up with Dr. Sarah Lee turned into a life-saving discovery. She noticed something others had missed for years. I'm grateful every day for that video call.",
    date: "October 3, 2024",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1666214280577-5b96b3292091?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
];

function Stars({ count = 5 }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-yellow-400"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function PatientStory() {
  const [expanded, setExpanded] = useState(null);

  const featured = stories[0];
  const gridStories = stories.slice(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-nunito   { font-family: 'Nunito Sans', sans-serif; }

        .stories-bg {
          background-color: #f8fffe;
          background-image:
            radial-gradient(ellipse 65% 45% at 0% 0%,    rgba(13,148,136,.09) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 100% 0%,  rgba(6,182,212,.07)  0%, transparent 60%),
            radial-gradient(ellipse 45% 35% at 100% 100%,rgba(16,185,129,.06) 0%, transparent 60%),
            radial-gradient(ellipse 55% 38% at 0%  100%, rgba(99,102,241,.04) 0%, transparent 55%);
        }

        .featured-card {
          border-radius: 2rem;
          overflow: hidden;
          background: white;
          box-shadow: 0 16px 50px rgba(13,148,136,.11), 0 2px 10px rgba(0,0,0,.05);
          border: 1px solid rgba(13,148,136,.10);
        }

        .story-card {
          background: white;
          border-radius: 1.5rem;
          border: 1px solid rgba(229,231,235,.8);
          box-shadow: 0 4px 18px rgba(13,148,136,.06), 0 1px 4px rgba(0,0,0,.03);
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .story-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 44px rgba(13,148,136,.12), 0 4px 10px rgba(0,0,0,.05);
          border-color: rgba(13,148,136,.18);
        }

        .img-container { position: relative; overflow: hidden; }
        .img-container img { transition: transform .4s ease; }
        .story-card:hover .img-container img { transform: scale(1.04); }

        .treatment-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 12px; border-radius: 999px;
          font-size: 11px; font-weight: 700;
          letter-spacing: .04em;
        }

        .quote-icon {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #0d9488, #06b6d4);
          flex-shrink: 0;
        }

        .read-more-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 700;
          color: #0d9488;
          padding: 6px 0;
          border-bottom: 1.5px solid transparent;
          transition: border-color .18s, gap .18s;
          background: none; cursor: pointer;
        }
        .read-more-btn:hover { border-bottom-color: #0d9488; gap: 10px; }

        .section-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,rgba(13,148,136,.10),rgba(6,182,212,.10));
          border: 1px solid rgba(13,148,136,.22); color: #0d9488;
          padding: 6px 16px; border-radius: 999px;
          font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
        }

        .grad-text {
          background: linear-gradient(135deg,#0d9488,#0891b2);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* Doctor mini card in featured */
        .doctor-mini {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 1rem;
          background: linear-gradient(135deg,rgba(13,148,136,.07),rgba(6,182,212,.07));
          border: 1px solid rgba(13,148,136,.14);
        }

        /* Online badge */
        .online-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(16,185,129,.10);
          border: 1px solid rgba(16,185,129,.22);
          color: #059669;
          padding: 3px 10px; border-radius: 999px;
          font-size: 10px; font-weight: 700;
        }

        .story-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(15,23,42,.70);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .story-modal {
          background: white; border-radius: 2rem;
          max-width: 600px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 40px 100px rgba(0,0,0,.22);
        }
        .story-modal::-webkit-scrollbar { width: 4px; }
        .story-modal::-webkit-scrollbar-thumb { background: #0d9488; border-radius: 4px; }

        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.5); }
          50%      { box-shadow: 0 0 0 5px rgba(16,185,129,0); }
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #10b981;
          animation: dotPulse 2s ease infinite; flex-shrink: 0;
        }
      `}</style>

      <section className="stories-bg font-nunito py-20 lg:py-28 relative overflow-hidden">
        {/* Subtle decorative arc */}
        <div className="pointer-events-none absolute top-0 right-0 opacity-[0.03]">
          <svg width="420" height="420" viewBox="0 0 420 420" fill="none">
            <circle cx="420" cy="0" r="260" stroke="#0d9488" strokeWidth="65" />
            <circle cx="420" cy="0" r="150" stroke="#06b6d4" strokeWidth="32" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* ══ HEADER ══ */}
          <div className="text-center mb-14">
            <div className="flex justify-center mb-4">
              <span className="section-pill">
                <span className="live-dot" />
                Real Stories, Real People
              </span>
            </div>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-gray-900 leading-tight mb-4">
              What Patients Say About{" "}
              <span className="grad-text italic">Dr. Sarah Lee</span>
            </h2>
            <p className="font-nunito text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
              Hundreds of patients have experienced compassionate online care.
              Here are a few stories that{" "}
              <span className="text-gray-800 font-semibold">
                mean the world to us.
              </span>
            </p>
          </div>

          {/* ══ FEATURED STORY ══ */}
          <div className="featured-card mb-10 grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[420px] overflow-hidden">
              <img
                src={featured.image}
                alt="Online consultation"
                className="w-full h-full object-cover object-center"
                style={{ transition: "transform .4s ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(13,148,136,.18) 0%, transparent 55%)",
                }}
              />
              <div className="absolute top-5 left-5">
                <span
                  className="font-nunito text-[11px] font-bold text-white px-3 py-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg,#0d9488,#06b6d4)",
                    boxShadow: "0 4px 14px rgba(13,148,136,.40)",
                  }}
                >
                  ✨ Featured Story
                </span>
              </div>
              {/* Online consult badge */}
              <div className="absolute bottom-5 left-5">
                <span className="online-badge font-nunito">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#10b981",
                      display: "inline-block",
                    }}
                  />
                  Online Consultation
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
              <div className="mb-4">
                <span
                  className="treatment-badge"
                  style={{
                    background: featured.treatmentBg,
                    color: featured.treatmentColor,
                    border: `1px solid ${featured.treatmentColor}22`,
                  }}
                >
                  {featured.treatmentIcon} {featured.treatment}
                </span>
              </div>

              <div>
                {/* Doctor mini card */}
                <div className="doctor-mini mb-5">
                  <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white shadow shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                      alt="Dr. Sarah Lee"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-nunito font-bold text-teal-800 text-xs leading-tight">
                      Dr. Sarah Lee
                    </p>
                    <p className="font-nunito text-teal-600 text-[10px]">
                      Cardiologist · Medicine Specialist
                    </p>
                  </div>
                  <span className="ml-auto online-badge font-nunito">
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#10b981",
                        display: "inline-block",
                      }}
                    />
                    Available
                  </span>
                </div>

                <div className="quote-icon mb-4">
                  <svg
                    className="w-5 h-5 text-white fill-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <h3 className="font-playfair text-2xl sm:text-[1.75rem] font-bold text-gray-900 leading-tight mb-3">
                  {featured.title}
                </h3>
                <p className="font-nunito text-gray-500 text-base leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-100 shadow shrink-0">
                    <img
                      src={featured.image}
                      alt={featured.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-nunito font-bold text-gray-800 text-sm">
                      {featured.name}, {featured.age}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Stars count={featured.rating} />
                      <span className="font-nunito text-xs text-gray-400">
                        {featured.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(featured)}
                  className="read-more-btn font-nunito"
                >
                  Read Full Story
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
                </button>
              </div>
            </div>
          </div>

          {/* ══ STORY GRID ══ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {gridStories.map((story) => (
              <div key={story.id} className="story-card group">
                {/* Image */}
                <div className="img-container h-48 relative">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,23,42,.50) 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="treatment-badge backdrop-blur-sm"
                      style={{
                        background: story.treatmentBg + "ee",
                        color: story.treatmentColor,
                        border: `1px solid ${story.treatmentColor}30`,
                      }}
                    >
                      {story.treatmentIcon} {story.treatment}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Stars count={story.rating} />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-3">
                    <svg
                      className="w-3.5 h-3.5 text-gray-400"
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
                    <span className="font-nunito text-xs text-gray-400 font-medium">
                      {story.date}
                    </span>
                  </div>

                  <h3 className="font-playfair font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-teal-700 transition-colors">
                    {story.title}
                  </h3>

                  <p className="font-nunito text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                    {story.excerpt.slice(0, 108)}…
                  </p>

                  <div
                    className="h-px mb-4"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(13,148,136,.12), transparent)",
                    }}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-full overflow-hidden border-2 shrink-0"
                        style={{ borderColor: story.treatmentColor + "35" }}
                      >
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <p className="font-nunito font-bold text-gray-800 text-xs leading-tight">
                          {story.name}
                        </p>
                        <p className="font-nunito text-[10px] text-gray-400">
                          Age {story.age}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpanded(story)}
                      className="read-more-btn font-nunito text-xs"
                    >
                      Read More
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
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ MODAL ══ */}
      {expanded && (
        <div className="story-overlay" onClick={() => setExpanded(null)}>
          <div className="story-modal" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-60 sm:h-72 overflow-hidden rounded-t-[2rem]">
              <img
                src={expanded.image}
                alt={expanded.name}
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,23,42,.55) 0%, transparent 50%)",
                }}
              />
              <button
                onClick={() => setExpanded(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
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
              <div className="absolute bottom-4 left-5">
                <span
                  className="treatment-badge backdrop-blur-sm"
                  style={{
                    background: expanded.treatmentBg + "ee",
                    color: expanded.treatmentColor,
                    border: `1px solid ${expanded.treatmentColor}30`,
                  }}
                >
                  {expanded.treatmentIcon} {expanded.treatment}
                </span>
              </div>
            </div>

            <div className="p-7 sm:p-9">
              {/* Doctor tag */}
              <div className="doctor-mini mb-5">
                <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white shadow shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    alt="Dr. Sarah Lee"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-nunito font-bold text-teal-800 text-xs">
                    Dr. Sarah Lee
                  </p>
                  <p className="font-nunito text-teal-600 text-[10px]">
                    Cardiologist · Medicine Specialist
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-teal-100 shadow shrink-0">
                  <img
                    src={expanded.image}
                    alt={expanded.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-nunito font-bold text-gray-900">
                    {expanded.name}, {expanded.age}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Stars count={expanded.rating} />
                    <span className="font-nunito text-xs text-gray-400">
                      {expanded.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="quote-icon mb-4">
                <svg
                  className="w-5 h-5 text-white fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <h3 className="font-playfair text-2xl font-bold text-gray-900 leading-tight mb-4">
                {expanded.title}
              </h3>
              <p className="font-nunito text-gray-600 text-base leading-relaxed mb-4">
                {expanded.excerpt}
              </p>
              <p className="font-nunito text-gray-500 text-sm leading-relaxed">
                The entire experience with Dr. Sarah Lee — from booking the
                online consultation to receiving my follow-up prescription — was
                seamless and genuinely caring. I felt heard and supported every
                step of the way. I cannot recommend her highly enough.
              </p>

              <div className="mt-7 flex gap-3 flex-wrap">
                <a
                  href="#"
                  className="font-nunito font-bold text-white px-6 py-3 rounded-xl text-sm flex-1 text-center transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg,#0d9488,#0891b2)",
                    boxShadow: "0 6px 18px rgba(13,148,136,.26)",
                  }}
                >
                  Book with Dr. Sarah Lee
                </a>
                <button
                  onClick={() => setExpanded(null)}
                  className="font-nunito font-semibold text-gray-600 px-6 py-3 rounded-xl text-sm border border-gray-200 hover:border-teal-200 hover:text-teal-600 transition-all"
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
