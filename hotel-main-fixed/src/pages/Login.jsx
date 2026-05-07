import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (currentState === "Login") {
        await login(form.email, form.password);
      } else {
        if (!form.name.trim()) { setError("Full name is required"); setLoading(false); return; }
        await register(form.name, form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-4">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800">
            {currentState === "Login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-gray-500">Hotel Booking Platform</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>
        )}

        {currentState === "Sign Up" && (
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]" required />
        )}

        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]" required />

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]" required minLength={6} />

        {currentState === "Login" && (
          <p className="text-sm text-right text-blue-600 cursor-pointer hover:underline">Forgot password?</p>
        )}

        <button type="submit" disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50">
          {loading ? "Please wait..." : currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {currentState === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => { setCurrentState(currentState === "Login" ? "Sign Up" : "Login"); setError(""); setForm({ name: "", email: "", password: "" }); }}
            className="text-black font-medium cursor-pointer hover:underline">
            {currentState === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
