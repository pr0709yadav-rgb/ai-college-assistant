import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { registerUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.college ||
      !formData.branch ||
      !formData.year ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name: formData.name,
        college: formData.college,
        branch: formData.branch,
        year: formData.year,
        email: formData.email,
        password: formData.password,
      });

      login(data.user, data.token);

      toast.success("Account created successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-6 py-10">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-cyan-400 text-center">
          Create Your Account
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Join AI College Assistant 🚀
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={formData.college}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-lg"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Signup;