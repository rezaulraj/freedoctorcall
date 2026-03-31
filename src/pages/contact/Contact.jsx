import React, { useState } from "react";
import BookingModal from "../../components/Bookingmodal";


const infoCards = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    label: "Emergency Hotline",
    value: "+1 (800) 123-4567",
    sub: "Available 24 hours, 7 days",
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fee2e2",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    label: "Email Us",
    value: "care@medicare.com",
    sub: "We reply within 2 hours",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#cffafe",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
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
    ),
    label: "Visit Us",
    value: "142 Health Ave, Chicago, IL",
    sub: "Mon–Sat: 8:00 AM – 8:00 PM",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#ccfbf1",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    label: "Live Chat",
    value: "Start Instant Chat",
    sub: "Avg. response: under 3 min",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ede9fe",
  },
];

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "Click the 'Book Appointment' button above, choose your specialty, date, and preferred time slot. You'll receive a confirmation within 30 minutes.",
  },
  {
    q: "Can I book a video consultation?",
    a: "Yes! When booking, simply select 'Video Call' as your consultation type. A secure link will be sent to your email before the session.",
  },
  {
    q: "What insurance plans do you accept?",
    a: "We accept 200+ insurance plans including Blue Cross, Aetna, Cigna, and Medicare. Contact us to verify your specific plan.",
  },
  {
    q: "How can I reschedule or cancel?",
    a: "You can reschedule or cancel up to 2 hours before your appointment via the Patient Portal or by calling our support line.",
  },
];

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [msgForm, setMsgForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [msgSent, setMsgSent] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        .c-nunito   { font-family: 'Nunito Sans', sans-serif; }
        .c-playfair { font-family: 'Playfair Display', serif; }

        /* ── HERO bg ── */
        .contact-hero {
          background: linear-gradient(150deg, #0f2027 0%, #0c2d2a 45%, #1a3f4a 100%);
          position: relative; overflow: hidden;
        }
        .contact-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 65% 55% at 8%   8%,  rgba(13,148,136,.24) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 92%  10%, rgba(6,182,212,.15)  0%, transparent 60%),
            radial-gradient(ellipse 45% 38% at 85%  90%, rgba(16,185,129,.12) 0%, transparent 60%),
            radial-gradient(ellipse 35% 30% at 5%   90%, rgba(99,102,241,.08) 0%, transparent 55%);
          pointer-events: none;
        }

        /* ── body bg ── */
        .contact-body {
          background-color: #f8fffe;
          background-image:
            radial-gradient(ellipse 55% 35% at 0% 0%,   rgba(13,148,136,.08) 0%, transparent 60%),
            radial-gradient(ellipse 45% 30% at 100% 100%,rgba(6,182,212,.06)  0%, transparent 55%);
        }

        /* Info card */
        .info-card {
          background: rgba(255,255,255,.09);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,.18);
          transition: transform .2s, box-shadow .2s;
        }
        .info-card:hover { transform: translateY(-4px); box-shadow: 0 16px 42px rgba(0,0,0,.24); }

        /* Form card */
        .form-card {
          background: white;
          border-radius: 2rem;
          border: 1px solid rgba(229,231,235,.7);
          box-shadow: 0 20px 60px rgba(13,148,136,.10), 0 4px 16px rgba(0,0,0,.05);
          overflow: hidden;
        }

        /* Input */
        .c-input {
          width: 100%; padding: 13px 16px; border-radius: 12px;
          border: 1.5px solid #e5e7eb; font-size: 14px; font-weight: 500;
          color: #1f2937; outline: none; transition: border-color .18s, box-shadow .18s;
          font-family: 'Nunito Sans', sans-serif; background: #fafafa;
        }
        .c-input:focus { border-color: #0d9488; background: white; box-shadow: 0 0 0 3px rgba(13,148,136,.10); }
        .c-input::placeholder { color: #9ca3af; font-weight: 400; }

        /* Primary btn */
        .c-btn {
          background: linear-gradient(135deg,#0d9488,#0891b2);
          color: white; font-weight: 800; font-size: 15px;
          padding: 15px 32px; border-radius: 14px;
          box-shadow: 0 8px 24px rgba(13,148,136,.30);
          transition: transform .15s, box-shadow .15s;
          border: none; cursor: pointer; font-family: 'Nunito Sans', sans-serif;
        }
        .c-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(13,148,136,.40); }
        .c-btn:active { transform: translateY(0); }

        /* Book big btn */
        .book-big-btn {
          background: linear-gradient(135deg,#0d9488,#06b6d4);
          color: white; font-weight: 800; font-size: 18px;
          padding: 20px 48px; border-radius: 20px;
          box-shadow: 0 12px 36px rgba(13,148,136,.40);
          transition: transform .18s, box-shadow .18s;
          border: none; cursor: pointer; font-family: 'Nunito Sans', sans-serif;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .book-big-btn:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(13,148,136,.50); }

        /* FAQ */
        .faq-item {
          border: 1.5px solid #e5e7eb; border-radius: 1rem;
          overflow: hidden; transition: border-color .2s;
          background: white;
        }
        .faq-item:hover { border-color: rgba(13,148,136,.30); }
        .faq-item.open  { border-color: rgba(13,148,136,.35); box-shadow: 0 4px 20px rgba(13,148,136,.08); }

        /* Grad text */
        .grad-text {
          background: linear-gradient(135deg,#0d9488,#06b6d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .grad-text-light {
          background: linear-gradient(135deg,#5eead4,#67e8f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* Map container */
        .map-wrap { border-radius: 1.5rem; overflow: hidden; border: 1px solid rgba(13,148,136,.12); }

        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.6); }
          50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
        }
        .live-dot {
          width: 9px; height: 9px; border-radius: 50%; background: #10b981;
          animation: dotPulse 2s ease infinite; flex-shrink: 0; display: inline-block;
        }

        @keyframes checkDraw { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
        .check-path { stroke-dasharray: 100; animation: checkDraw .6s ease .2s both; }
        @keyframes scaleUp { from{transform:scale(.5);opacity:0} to{transform:scale(1);opacity:1} }
        .success-ico { animation: scaleUp .4s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section
        className="contact-hero c-nunito relative"
        style={{ paddingTop: "84px" }}
      >
        {/* Decorative arcs */}
        <div className="pointer-events-none absolute top-0 right-0 opacity-[0.06]">
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
            <circle cx="500" cy="0" r="300" stroke="white" strokeWidth="75" />
            <circle cx="500" cy="0" r="175" stroke="#5eead4" strokeWidth="38" />
          </svg>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 opacity-[0.04]">
          <svg width="380" height="380" viewBox="0 0 380 380" fill="none">
            <circle cx="0" cy="380" r="240" stroke="#5eead4" strokeWidth="55" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-300/60 mb-6">
            <span>Home</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-teal-300">Contact & Book</span>
          </div>

          {/* Headline */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-400/25 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              <span className="live-dot" />
              We're Here for You — Always
            </div>
            <h1 className="c-playfair text-5xl sm:text-6xl lg:text-[4rem] font-bold text-white leading-[1.06] tracking-tight mb-5">
              Book Your{" "}
              <span className="grad-text-light italic">Appointment</span>
              <br />
              <span className="text-white">or Get in Touch</span>
            </h1>
            <p className="c-nunito text-white/50 text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Schedule a visit in under 60 seconds, send us a message, or simply
              call —
              <span className="text-white/80 font-semibold">
                {" "}
                we respond fast.
              </span>
            </p>

            {/* Big CTA */}
            <button className="book-big-btn" onClick={() => setModalOpen(true)}>
              <svg
                className="w-6 h-6"
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
              Book an Appointment Now
            </button>

            <p className="c-nunito text-white/30 text-xs mt-4">
              No account needed · Confirmed within 30 minutes
            </p>
          </div>

          {/* ── 4 Info Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
            {infoCards.map((c, i) => (
              <div key={i} className="info-card p-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${c.color}22`,
                    border: `1px solid ${c.color}33`,
                    color:
                      c.color === "#0d9488"
                        ? "#5eead4"
                        : c.color === "#ef4444"
                          ? "#fca5a5"
                          : c.color === "#0891b2"
                            ? "#67e8f9"
                            : "#c4b5fd",
                  }}
                >
                  {c.icon}
                </div>
                <p className="c-nunito text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
                  {c.label}
                </p>
                <p className="c-nunito text-sm font-bold text-white leading-tight mb-0.5">
                  {c.value}
                </p>
                <p className="c-nunito text-[11px] text-white/40">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ width: "100%", height: "65px", display: "block" }}
          >
            <path
              d="M0 0 Q360 65 720 32 Q1080 0 1440 50 L1440 65 L0 65 Z"
              fill="#f8fffe"
            />
          </svg>
        </div>
      </section>

      {/* ══════════ BODY ══════════ */}
      <section className="contact-body c-nunito py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            {/* ── LEFT: Contact / Message Form ── */}
            <div className="form-card">
              {/* Header strip */}
              <div
                className="relative overflow-hidden px-8 pt-8 pb-6"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(13,148,136,.06),rgba(6,182,212,.06))",
                  borderBottom: "1px solid rgba(13,148,136,.10)",
                }}
              >
                <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-3">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Send a Message
                </div>
                <h2 className="c-playfair text-3xl font-bold text-gray-900">
                  We'd Love to <span className="grad-text italic">Hear</span>{" "}
                  from You
                </h2>
                <p className="c-nunito text-gray-500 text-sm mt-2">
                  Fill out the form — our team responds within 2 hours.
                </p>
              </div>

              <div className="p-8">
                {msgSent ? (
                  <div className="py-10 text-center">
                    <div
                      className="success-ico w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg,#0d9488,#06b6d4)",
                        boxShadow: "0 10px 30px rgba(13,148,136,.35)",
                      }}
                    >
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="white"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="check-path"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="c-playfair text-2xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="c-nunito text-gray-500 text-sm mb-6">
                      Thanks{" "}
                      <strong className="text-gray-800">{msgForm.name}</strong>!
                      We'll get back to you shortly at{" "}
                      <strong className="text-teal-600">{msgForm.email}</strong>
                      .
                    </p>
                    <button
                      onClick={() => {
                        setMsgSent(false);
                        setMsgForm({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="c-btn px-8 py-3 text-sm"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setMsgSent(true);
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="c-nunito text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">
                          Full Name
                        </label>
                        <input
                          className="c-input"
                          placeholder="John Carter"
                          required
                          value={msgForm.name}
                          onChange={(e) =>
                            setMsgForm({ ...msgForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="c-nunito text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="c-input"
                          placeholder="john@email.com"
                          required
                          value={msgForm.email}
                          onChange={(e) =>
                            setMsgForm({ ...msgForm, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="c-nunito text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">
                        Subject
                      </label>
                      <input
                        className="c-input"
                        placeholder="e.g. Appointment enquiry, Insurance query…"
                        value={msgForm.subject}
                        onChange={(e) =>
                          setMsgForm({ ...msgForm, subject: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="c-nunito text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">
                        Message
                      </label>
                      <textarea
                        className="c-input resize-none"
                        rows={5}
                        required
                        placeholder="Tell us how we can help you…"
                        value={msgForm.message}
                        onChange={(e) =>
                          setMsgForm({ ...msgForm, message: e.target.value })
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      className="c-btn w-full flex items-center justify-center gap-2"
                    >
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Send Message
                    </button>
                    <p className="c-nunito text-[11px] text-gray-400 text-center">
                      🔒 We never share your information.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ── RIGHT: Details & Map ── */}
            <div className="space-y-6">
              {/* Detail cards */}
              {infoCards.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border transition-all hover:shadow-lg hover:border-opacity-50"
                  style={{
                    border: `1.5px solid ${c.border}`,
                    boxShadow: "0 2px 12px rgba(0,0,0,.04)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: c.bg,
                      color: c.color,
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="c-nunito text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {c.label}
                    </p>
                    <p className="c-nunito font-bold text-gray-900 text-base mt-0.5">
                      {c.value}
                    </p>
                    <p className="c-nunito text-xs text-gray-400 mt-0.5">
                      {c.sub}
                    </p>
                  </div>
                </div>
              ))}

              {/* Map embed */}
              <div className="map-wrap shadow-lg" style={{ height: "220px" }}>
                <iframe
                  title="MediCare Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.2865637936!2d-87.6296!3d41.8781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca6e0f7b4b5%3A0x4e5c96f1a3a0e3b1!2sChicago%2C%20IL!5e0!3m2!1sen!2sus!4v1710000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* ══════════ FAQ ══════════ */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Common Questions
              </div>
              <h2 className="c-playfair text-4xl font-bold text-gray-900">
                Frequently Asked{" "}
                <span className="grad-text italic">Questions</span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className={`faq-item ${openFaq === i ? "open" : ""}`}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="c-nunito font-bold text-gray-800 text-sm pr-4">
                      {f.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${openFaq === i ? "rotate-45" : ""}`}
                      style={{
                        background:
                          openFaq === i
                            ? "linear-gradient(135deg,#0d9488,#06b6d4)"
                            : "#f0fdf4",
                        border: "1px solid rgba(13,148,136,.15)",
                      }}
                    >
                      <svg
                        className={`w-3.5 h-3.5 ${openFaq === i ? "text-white" : "text-teal-600"}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="c-nunito text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                        {f.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ══════════ BOTTOM CTA BANNER ══════════ */}
          <div
            className="relative overflow-hidden rounded-3xl text-center px-8 py-14"
            style={{
              background:
                "linear-gradient(135deg,#0f2027 0%,#0d2d2a 50%,#134e4a 100%)",
            }}
          >
            {/* Decorative */}
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 900 300"
                fill="none"
                preserveAspectRatio="none"
              >
                <circle
                  cx="820"
                  cy="-30"
                  r="220"
                  stroke="white"
                  strokeWidth="60"
                />
                <circle
                  cx="70"
                  cy="330"
                  r="160"
                  stroke="#5eead4"
                  strokeWidth="45"
                />
              </svg>
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-400/25 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5">
                <span className="live-dot" />
                Ready to See a Doctor?
              </div>
              <h2 className="c-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
                Your Health Can't{" "}
                <span className="grad-text-light italic">Wait</span>
              </h2>
              <p className="c-nunito text-white/50 text-lg mb-8 max-w-lg mx-auto">
                Book an appointment today and get matched with a specialist in
                minutes.
              </p>
              <button
                className="book-big-btn"
                onClick={() => setModalOpen(true)}
              >
                <svg
                  className="w-6 h-6"
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
                Book Appointment Now
              </button>
              <p className="c-nunito text-white/25 text-xs mt-4">
                Free cancellation · No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
