import { useState } from "react";

import { verifyOTP } from "../../services/forgotPassword.service";

function OTPForm({
  email,
  otp,
  setOtp,
  setStep,
}) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter OTP.");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyOTP(
        email,
        otp
      );

      setMessage(data.message);

      setTimeout(() => {
        setStep(3);
      }, 1000);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Invalid OTP."
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
          Enter OTP
        </label>

        <input
          type="text"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3 text-center tracking-[8px] text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 transition"
      >
        {loading
          ? "Verifying..."
          : "Verify OTP"}
      </button>
    </form>
  );
}

export default OTPForm;