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

      const data = await startInterview(
        type,
        role
      );

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

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}

        <div className="bg-slate-800 rounded-xl p-8">

          <h1 className="text-4xl font-bold text-cyan-400">
            AI Mock Interview
          </h1>

          <p className="text-slate-400 mt-3">
            Practice HR and Technical interviews
            with AI.
          </p>

        </div>

        {/* Settings */}

        <div className="bg-slate-800 rounded-xl p-8 space-y-5">

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          >
            <option>Technical</option>
            <option>HR</option>
          </select>

          <input
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            placeholder="Job Role (MERN Developer)"
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <button
            onClick={handleStart}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Starting..."
              : "Start Interview"}
          </button>

        </div>

        {/* Question */}

        {question && (

          <div className="bg-slate-800 rounded-xl p-8">

            <h2 className="text-2xl font-bold text-cyan-400">
              Interview Question
            </h2>

            <p className="mt-5 text-lg">
              {question}
            </p>

            <textarea
              rows={8}
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              placeholder="Write your answer..."
              className="mt-6 w-full p-4 rounded-lg bg-slate-700 text-white"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Submitting..."
                : "Submit Answer"}
            </button>

          </div>

        )}

        {/* Feedback */}

        {feedback && (

          <div className="bg-slate-800 rounded-xl p-8">

            <h2 className="text-2xl font-bold text-green-400">
              AI Feedback
            </h2>

            <div className="mt-5">

              <p className="text-3xl font-bold text-cyan-400">

                Score : {score}/10

              </p>

              <p className="mt-6 whitespace-pre-wrap leading-8">

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