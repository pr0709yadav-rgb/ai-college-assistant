import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "../../services/forgotPassword.service";

function ResetPasswordForm({
  email,
  otp,
}) {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await resetPassword(
          email,
          password
        );

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Failed to reset password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block font-medium mb-2">
          New Password
        </label>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          Confirm Password
        </label>

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {message && (
        <p className="text-green-600 text-sm">
          {message}
        </p>
      )}

      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white rounded-lg py-3 hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading
          ? "Updating Password..."
          : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPasswordForm;