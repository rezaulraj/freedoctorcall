import { useState } from "react";
import { X } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, loading } = useAuthStore();

  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    roleId: 3,
    fullName: "",
    email: "",
    phone: "",
    password: "",
    identifier: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await login({
          identifier: form.identifier,
          password: form.password,
        });
      } else {
        await register({
          roleId: Number(form.roleId),
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });
      }

      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          {mode === "login"
            ? "Login to continue your medical dashboard."
            : "Create your account to book appointments."}
        </p>

        {error && (
          <div className="mt-4 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="mt-5 space-y-4">
          {mode === "register" && (
            <>
              <select
                name="roleId"
                value={form.roleId}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={3}>Patient</option>
                <option value={2}>Doctor</option>
              </select>

              <input
                name="fullName"
                placeholder="Full name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              />
            </>
          )}

          {mode === "login" && (
            <input
              name="identifier"
              placeholder="Email or phone"
              value={form.identifier}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
            />
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Sign Up"}
          </button>
        </form>

        <button
          onClick={() => {
            setError("");
            setMode(mode === "login" ? "register" : "login");
          }}
          className="mt-5 text-sm text-teal-600 font-semibold"
        >
          {mode === "login"
            ? "Don't have an account? Create account"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
