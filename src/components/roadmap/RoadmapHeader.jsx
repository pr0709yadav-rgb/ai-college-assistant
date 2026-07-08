import { Sparkles } from "lucide-react";

function RoadmapHeader() {
  return (
    <div className="mb-8">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">

          <Sparkles
            size={28}
            className="text-cyan-600 dark:text-cyan-400"
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Roadmap Generator
          </h1>

          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Generate a personalized learning roadmap powered by AI based on your
            career goal, skill level, and learning duration.
          </p>

        </div>

      </div>

    </div>
  );
}

export default RoadmapHeader;