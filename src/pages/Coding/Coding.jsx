import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { codingAssistant } from "../../services/coding.service";

import LanguageSelector from "../../components/coding/LanguageSelector";
import PromptInput from "../../components/coding/PromptInput";
import PromptSuggestions from "../../components/coding/PromptSuggestions";
import CodeEditor from "../../components/coding/CodeEditor";
import ResponsePanel from "../../components/coding/ResponsePanel";
import ErrorMessage from "../../components/coding/ErrorMessage";
import ClearButton from "../../components/coding/ClearButton";

const Coding = () => {
  const [language, setLanguage] = useState("javascript");
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim() && !code.trim()) {
      setError("Please enter a prompt or paste your code.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await codingAssistant({
        language,
        prompt,
        code,
      });

      setResponse(res.reply || "No response generated.");
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <ErrorMessage
          message={error}
          onClose={() => setError("")}
        />

        {/* Header */}

        <div className="bg-slate-800 rounded-xl p-8 shadow-lg">

          <h1 className="text-3xl font-bold text-white">
            AI Coding Assistant
          </h1>

          <p className="text-slate-400 mt-3">
            Explain code, debug errors, optimize performance and generate
            solutions using AI.
          </p>

        </div>

        {/* Main Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT PANEL */}

          <div className="bg-slate-800 rounded-xl shadow-lg p-6 h-[760px] flex flex-col">

            <div className="space-y-5">

              <LanguageSelector
                language={language}
                setLanguage={setLanguage}
              />

              <PromptInput
                prompt={prompt}
                setPrompt={setPrompt}
              />

              <PromptSuggestions
                setPrompt={setPrompt}
              />

            </div>

            {/* Editor */}

            <div className="flex-1 mt-5 overflow-hidden">

              <CodeEditor
                language={language}
                code={code}
                setCode={setCode}
              />

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-2 gap-4 mt-5">

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold transition"
              >
                {loading ? "Generating..." : "Generate Response"}
              </button>

              <ClearButton
                setPrompt={setPrompt}
                setCode={setCode}
                setResponse={setResponse}
                setError={setError}
              />

            </div>

          </div>

          {/* RIGHT PANEL */}

          <ResponsePanel
            response={response}
            loading={loading}
            onRegenerate={handleGenerate}
          />

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Coding;