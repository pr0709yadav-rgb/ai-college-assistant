import { useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  startInterview,
  submitAnswer,
} from "../../services/interview.service";

function Interview() {
  const [type, setType] = useState("Technical");
  const [role, setRole] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);

  const [loading, setLoading] = useState(false);

  // ===========================
  // Start Interview
  // ===========================

  const handleStart = async () => {
    if (!role.trim()) {
      return toast.error("Please enter job role.");
    }

    try {
      setLoading(true);

      const data = await startInterview(type, role);

      setQuestion(data.question);
      setFeedback("");
      setScore(null);
      setAnswer("");

      toast.success("Interview Started");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to start interview."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Submit Answer
  // ===========================

  const handleSubmit = async () => {
    if (!answer.trim()) {
      return toast.error("Write your answer.");
    }

    try {
      setLoading(true);

      const data = await submitAnswer(
        question,
        answer,
        role,
        type
      );

      setScore(data.result.score);
      setFeedback(data.result.feedback);
      setQuestion(data.result.nextQuestion);
      setAnswer("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Submission failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
            AI Mock Interview
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Practice HR and Technical interviews with AI.
            Get instant feedback, improve your answers,
            and prepare confidently for your next interview.
          </p>
        </div>

        {/* Interview Settings */}

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Interview Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>Technical</option>
              <option>HR</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Job Role
            </label>

            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. MERN Stack Developer"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>

        </div>

        {/* Interview Question */}

        {question && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              Interview Question
            </h2>

            <div className="mt-6 rounded-xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/30">
              <p className="text-lg leading-8 text-slate-700 dark:text-slate-200">
                {question}
              </p>
            </div>

            <label className="mt-8 mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Your Answer
            </label>

            <textarea
              rows={8}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your answer here..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Answer"}
            </button>

          </div>
        )}

        {/* AI Feedback */}

        {feedback && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
              AI Feedback
            </h2>

            <div className="mt-6 flex items-center gap-4 rounded-xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-900 dark:bg-cyan-950/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-2xl font-bold text-white">
                {score}
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-800 dark:text-white">
                  Overall Score
                </p>

                <p className="text-slate-600 dark:text-slate-400">
                  {score}/10
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-3 text-lg font-semibold text-slate-800 dark:text-white">
                Detailed Feedback
              </h3>

              <p className="whitespace-pre-wrap leading-8 text-slate-700 dark:text-slate-300">
                {feedback}
              </p>
            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default Interview;