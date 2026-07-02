import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields.");
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // Login using Auth Context
      login(data.user, data.token);

      toast.success(data.message);

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-cyan-400 text-center">
          AI College Assistant
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Welcome Back 👋
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* Email */}

          <div>

            <label className="text-gray-300 block mb-2">
              Email
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-cyan-400"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-gray-300 block mb-2">
              Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full pl-12 pr-12 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white outline-none focus:border-cyan-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 hover:bg-cyan-300 transition text-black py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-4">

            <hr className="flex-1 border-slate-600" />

            <span className="text-gray-400">
              OR
            </span>

            <hr className="flex-1 border-slate-600" />

          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition"
          >
            <FaGoogle />
            Continue with Google
          </button>

        </form>

        <p className="text-center mt-8 text-gray-400">

          Don't have an account?

          <Link
            to="/signup"
            className="text-cyan-400 ml-2 hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;