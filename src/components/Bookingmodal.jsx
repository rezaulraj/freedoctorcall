import React, { useState } from "react";

const specialties = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Dental",
  "Ophthalmology",
  "Orthopedics",
  "Dermatology",
  "Pediatrics",
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedType, setSelectedType] = useState("in-person");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    date: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setStep(1);
    setSelectedSlot("");
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      specialty: "",
      date: "",
      notes: "",
    });
    onClose();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        .modal-font { font-family: 'Nunito Sans', sans-serif; }
        .modal-playfair { font-family: 'Playfair Display', serif; }

        .modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(10,25,30,.75);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .modal-box {
          background: white; border-radius: 2rem;
          width: 100%; max-width: 560px;
          max-height: 92vh; overflow-y: auto;
          box-shadow: 0 40px 100px rgba(0,0,0,.30), 0 0 0 1px rgba(13,148,136,.12);
          position: relative;
        }
        .modal-box::-webkit-scrollbar { width: 4px; }
        .modal-box::-webkit-scrollbar-thumb { background: #0d9488; border-radius: 4px; }

        /* Progress bar */
        .progress-bar {
          height: 4px; border-radius: 999px;
          background: linear-gradient(90deg, #0d9488, #06b6d4);
          transition: width .35s ease;
        }

        /* Step dot */
        .step-dot {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800;
          transition: all .2s;
        }
        .step-dot.done  { background: linear-gradient(135deg,#0d9488,#06b6d4); color: white; }
        .step-dot.active{ background: linear-gradient(135deg,#0d9488,#06b6d4); color: white; box-shadow: 0 0 0 4px rgba(13,148,136,.18); }
        .step-dot.todo  { background: #f0fdf4; color: #9ca3af; border: 1.5px solid #e5e7eb; }

        /* Input */
        .modal-input {
          width: 100%; padding: 12px 16px; border-radius: 12px;
          border: 1.5px solid #e5e7eb; font-size: 14px; font-weight: 500;
          color: #1f2937; outline: none; transition: border-color .18s, box-shadow .18s;
          font-family: 'Nunito Sans', sans-serif;
          background: white;
        }
        .modal-input:focus { border-color: #0d9488; box-shadow: 0 0 0 3px rgba(13,148,136,.10); }
        .modal-input::placeholder { color: #9ca3af; }

        /* Time slot */
        .time-slot {
          padding: 8px 14px; border-radius: 10px;
          font-size: 12px; font-weight: 700;
          border: 1.5px solid #e5e7eb;
          cursor: pointer; transition: all .15s;
          font-family: 'Nunito Sans', sans-serif;
        }
        .time-slot:hover { border-color: #0d9488; color: #0d9488; background: rgba(13,148,136,.04); }
        .time-slot.selected {
          background: linear-gradient(135deg,#0d9488,#0891b2);
          color: white; border-color: transparent;
          box-shadow: 0 4px 12px rgba(13,148,136,.28);
        }

        /* Consult type */
        .consult-type {
          flex: 1; padding: 14px 12px; border-radius: 14px;
          border: 1.5px solid #e5e7eb; cursor: pointer;
          transition: all .18s; text-align: center;
        }
        .consult-type.selected { border-color: #0d9488; background: rgba(13,148,136,.05); }
        .consult-type:hover { border-color: #0d9488; }

        /* Primary btn */
        .btn-primary {
          background: linear-gradient(135deg,#0d9488,#0891b2);
          color: white; font-weight: 800; font-size: 15px;
          padding: 14px 28px; border-radius: 14px;
          box-shadow: 0 8px 24px rgba(13,148,136,.32);
          transition: transform .15s, box-shadow .15s;
          width: 100%; font-family: 'Nunito Sans', sans-serif;
          cursor: pointer; border: none;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(13,148,136,.40); }
        .btn-primary:active { transform: translateY(0); }

        .btn-back {
          background: #f9fafb; color: #6b7280; font-weight: 700; font-size: 14px;
          padding: 12px 20px; border-radius: 12px; border: 1.5px solid #e5e7eb;
          transition: all .15s; cursor: pointer; font-family: 'Nunito Sans', sans-serif;
        }
        .btn-back:hover { background: white; border-color: #0d9488; color: #0d9488; }

        /* Success checkmark */
        @keyframes checkDraw {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
        .check-path { stroke-dasharray: 100; animation: checkDraw .6s ease .3s both; }
        @keyframes scaleUp { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .success-icon { animation: scaleUp .4s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      <div
        className="modal-overlay modal-font"
        onClick={(e) => e.target === e.currentTarget && reset()}
      >
        <div className="modal-box">
          {/* ── Header ── */}
          <div
            className="relative overflow-hidden rounded-t-[2rem]"
            style={{
              background:
                "linear-gradient(135deg,#0f2027 0%,#0d2d2a 50%,#134e4a 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 560 160"
                fill="none"
                preserveAspectRatio="none"
              >
                <circle
                  cx="500"
                  cy="-20"
                  r="180"
                  stroke="white"
                  strokeWidth="60"
                />
                <circle
                  cx="60"
                  cy="160"
                  r="120"
                  stroke="#5eead4"
                  strokeWidth="40"
                />
              </svg>
            </div>
            <div className="relative px-7 pt-7 pb-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-teal-500/25 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-teal-300"
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
                  </div>
                  <span className="modal-font text-teal-300 text-xs font-bold uppercase tracking-widest">
                    Book Appointment
                  </span>
                </div>
                <h2 className="modal-playfair text-2xl font-bold text-white leading-tight">
                  {submitted
                    ? "You're All Set!"
                    : step === 1
                      ? "Choose Your Visit"
                      : "Your Details"}
                </h2>
                <p className="modal-font text-white/50 text-sm mt-1">
                  {submitted
                    ? "We'll confirm within 30 minutes."
                    : `Step ${step} of 2 — ${step === 1 ? "Specialty, date & time" : "Personal information"}`}
                </p>
              </div>
              <button
                onClick={reset}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors flex-shrink-0 mt-1"
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

            {/* Step indicators */}
            {!submitted && (
              <div className="px-7 pb-5 flex items-center gap-3">
                {[1, 2].map((s) => (
                  <React.Fragment key={s}>
                    <div
                      className={`step-dot ${s < step ? "done" : s === step ? "active" : "todo"}`}
                    >
                      {s < step ? (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        s
                      )}
                    </div>
                    {s < 2 && (
                      <div
                        className="flex-1 h-px"
                        style={{
                          background:
                            s < step
                              ? "linear-gradient(90deg,#0d9488,#06b6d4)"
                              : "rgba(255,255,255,.15)",
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
                <div className="ml-auto">
                  <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="progress-bar"
                      style={{ width: `${(step / 2) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── BODY ── */}
          <div className="p-7">
            {/* SUCCESS */}
            {submitted && (
              <div className="py-8 text-center">
                <div
                  className="success-icon w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#0d9488,#06b6d4)",
                    boxShadow: "0 12px 36px rgba(13,148,136,.35)",
                  }}
                >
                  <svg
                    className="w-10 h-10"
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
                <h3 className="modal-playfair text-2xl font-bold text-gray-900 mb-2">
                  Appointment Requested!
                </h3>
                <p className="modal-font text-gray-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                  Thank you,{" "}
                  <span className="font-bold text-gray-800">
                    {form.name || "there"}
                  </span>
                  ! We've received your request for{" "}
                  <span className="font-bold text-teal-600">
                    {form.specialty || "General Medicine"}
                  </span>{" "}
                  on{" "}
                  <span className="font-bold text-gray-800">{form.date}</span>{" "}
                  at{" "}
                  <span className="font-bold text-gray-800">
                    {selectedSlot}
                  </span>
                  .
                </p>
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-6 text-left space-y-2">
                  {[
                    {
                      label: "Confirmation sent to",
                      value: form.email || "your email",
                    },
                    {
                      label: "Consult type",
                      value:
                        selectedType === "in-person"
                          ? "🏥 In-Person Visit"
                          : "💻 Video Consultation",
                    },
                    {
                      label: "Reference ID",
                      value: `MCR-${Math.floor(100000 + Math.random() * 900000)}`,
                    },
                  ].map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between"
                    >
                      <span className="modal-font text-xs text-gray-400 font-semibold">
                        {r.label}
                      </span>
                      <span className="modal-font text-xs font-bold text-gray-700">
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={reset} className="btn-primary">
                  Close & Done
                </button>
              </div>
            )}

            {/* STEP 1 */}
            {!submitted && step === 1 && (
              <div className="space-y-5">
                {/* Consult type */}
                <div>
                  <label className="modal-font text-xs font-bold text-gray-500 uppercase tracking-widest mb-2.5 block">
                    Consultation Type
                  </label>
                  <div className="flex gap-3">
                    {[
                      {
                        id: "in-person",
                        icon: "🏥",
                        label: "In-Person",
                        sub: "Visit the clinic",
                      },
                      {
                        id: "video",
                        icon: "💻",
                        label: "Video Call",
                        sub: "From anywhere",
                      },
                      {
                        id: "call",
                        icon: "📞",
                        label: "Phone Call",
                        sub: "Quick consult",
                      },
                    ].map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedType(t.id)}
                        className={`consult-type ${selectedType === t.id ? "selected" : ""}`}
                      >
                        <span className="text-2xl block mb-1">{t.icon}</span>
                        <p className="modal-font text-xs font-bold text-gray-800">
                          {t.label}
                        </p>
                        <p className="modal-font text-[10px] text-gray-400">
                          {t.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialty */}
                <div>
                  <label className="modal-font text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                    Specialty
                  </label>
                  <select
                    className="modal-input"
                    value={form.specialty}
                    onChange={(e) =>
                      setForm({ ...form, specialty: e.target.value })
                    }
                  >
                    <option value="">Select a specialty…</option>
                    {specialties.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="modal-font text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="modal-input"
                    value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>

                {/* Time slots */}
                <div>
                  <label className="modal-font text-xs font-bold text-gray-500 uppercase tracking-widest mb-2.5 block">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedSlot(t)}
                        className={`time-slot ${selectedSlot === t ? "selected" : ""}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary mt-2"
                  onClick={() =>
                    form.specialty && form.date && selectedSlot && setStep(2)
                  }
                  style={{
                    opacity:
                      form.specialty && form.date && selectedSlot ? 1 : 0.5,
                  }}
                >
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {!submitted && step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="modal-font text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                      Full Name
                    </label>
                    <input
                      className="modal-input"
                      placeholder="John Doe"
                      value={form.name}
                      required
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="modal-font text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                      Phone
                    </label>
                    <input
                      className="modal-input"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      required
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="modal-font text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="modal-input"
                    placeholder="john@example.com"
                    value={form.email}
                    required
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>

                {/* Summary */}
                <div
                  className="rounded-2xl p-4 space-y-2"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(13,148,136,.06),rgba(6,182,212,.06))",
                    border: "1px solid rgba(13,148,136,.14)",
                  }}
                >
                  <p className="modal-font text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-2">
                    Booking Summary
                  </p>
                  {[
                    { label: "Specialty", value: form.specialty },
                    { label: "Date", value: form.date },
                    { label: "Time", value: selectedSlot },
                    {
                      label: "Type",
                      value:
                        selectedType === "in-person"
                          ? "In-Person"
                          : selectedType === "video"
                            ? "Video Call"
                            : "Phone Call",
                    },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between">
                      <span className="modal-font text-xs text-gray-400 font-semibold">
                        {r.label}
                      </span>
                      <span className="modal-font text-xs font-bold text-gray-700">
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="modal-font text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
                    Notes / Symptoms (optional)
                  </label>
                  <textarea
                    className="modal-input resize-none"
                    rows={3}
                    placeholder="Describe your symptoms or reason for visit…"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="btn-back"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1 }}
                  >
                    Confirm Appointment 🎉
                  </button>
                </div>

                <p className="modal-font text-[11px] text-gray-400 text-center">
                  🔒 Your information is encrypted and never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
