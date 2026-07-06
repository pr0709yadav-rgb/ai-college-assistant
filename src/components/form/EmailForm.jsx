import { useState } from "react";
import { sendOTP } from "../../services/forgotPassword.service";

function EmailForm({
  email,
  setEmail,
  setStep,
}) {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const data = await sendOTP(email);

      setMessage(data.message);

      setTimeout(() => {
        setStep(2);
      }, 1000);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Something went wrong."
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
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter registered email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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
        className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition"
      >
        {loading
          ? "Sending OTP..."
          : "Send OTP"}
      </button>
    </form>
  );
}

export default EmailForm;