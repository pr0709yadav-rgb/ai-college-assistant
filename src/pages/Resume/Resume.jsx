import { useState } from "react";
import toast from "react-hot-toast";
import {
  UploadCloud,
  FileText,
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { analyzeResume } from "../../services/resume.service";

function Resume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!file) {
      return toast.error("Please select a PDF resume.");
    }

    try {
      setLoading(true);

      const data = await analyzeResume(file);

      setAnalysis(data.analysis);

      toast.success("Resume analyzed successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Resume analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}

        <div className="bg-slate-800 rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            AI Resume Analyzer
          </h1>

          <p className="text-slate-400 mt-3">
            Upload your resume and receive an AI-powered ATS review.
          </p>
        </div>

        {/* Upload */}

        <div className="bg-slate-800 rounded-2xl p-8">

          <div className="border-2 border-dashed border-cyan-500 rounded-xl p-10 text-center">

            <UploadCloud
              size={70}
              className="mx-auto text-cyan-400"
            />

            <h2 className="text-2xl font-semibold mt-5">
              Upload Resume
            </h2>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="mt-6 block mx-auto text-white"
            />

            {file && (
              <div className="flex justify-center items-center gap-3 mt-6 text-cyan-400">
                <FileText />
                <span>{file.name}</span>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold text-white"
            >
              {loading
                ? "Analyzing..."
                : "Analyze Resume"}
            </button>

          </div>

        </div>

        {/* Result */}

        {analysis && (
          <>
            {/* Scores */}

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <Award
                  className="mx-auto text-green-400"
                  size={45}
                />

                <h2 className="text-xl mt-4">
                  Resume Score
                </h2>

                <p className="text-5xl font-bold text-green-400 mt-3">
                  {analysis.resumeScore}/100
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <Award
                  className="mx-auto text-cyan-400"
                  size={45}
                />

                <h2 className="text-xl mt-4">
                  ATS Score
                </h2>

                <p className="text-5xl font-bold text-cyan-400 mt-3">
                  {analysis.atsScore}%
                </p>
              </div>

            </div>

            {/* Analysis */}

            <div className="grid md:grid-cols-2 gap-6">

              <Card
                title="Strengths"
                color="text-green-400"
                icon={<CheckCircle />}
                items={analysis.strengths}
              />

              <Card
                title="Weaknesses"
                color="text-red-400"
                icon={<XCircle />}
                items={analysis.weaknesses}
              />

              <Card
                title="Missing Skills"
                color="text-yellow-400"
                icon={<AlertTriangle />}
                items={analysis.missingSkills}
              />

              <Card
                title="Suggestions"
                color="text-cyan-400"
                icon={<Lightbulb />}
                items={analysis.suggestions}
              />

            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}

function Card({
  title,
  color,
  icon,
  items,
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">

      <div className={`flex items-center gap-3 ${color}`}>

        {icon}

        <h2 className="text-xl font-bold">
          {title}
        </h2>

      </div>

      <ul className="mt-5 space-y-3 text-slate-300">

        {items?.map((item, index) => (
          <li key={index}>
            • {item}
          </li>
        ))}

      </ul>

    </div>
  );
}

export default Resume;