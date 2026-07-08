import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import RoadmapHeader from "../../components/roadmap/RoadmapHeader";
import GoalSelector from "../../components/roadmap/GoalSelector";
import SkillLevel from "../../components/roadmap/SkillLevel";
import TimelineSelector from "../../components/roadmap/TimelineSelector";
import RoadmapOutput from "../../components/roadmap/RoadmapOutput";
import ProgressTracker from "../../components/roadmap/ProgressTracker";
import ExportRoadmap from "../../components/roadmap/ExportRoadmap";

import {
  generateRoadmap,
  saveRoadmap,
  getRoadmaps,
  deleteRoadmap,
} from "../../services/roadmap.service";

function Roadmap() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("3 Months");
  const [roadmap, setRoadmap] = useState([]);
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!goal) {
      return alert("Please select a goal.");
    }

    try {
      setLoading(true);

      const data = await generateRoadmap({
        goal,
        level,
        duration,
      });

      setRoadmap(data.roadmap);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      await saveRoadmap({
        goal,
        level,
        duration,
        roadmap,
      });

      alert("Roadmap Saved Successfully!");

      loadRoadmaps();
    } catch (error) {
      console.log(error);
    }
  };

  const loadRoadmaps = async () => {
    try {
      const data = await getRoadmaps();

      setSavedRoadmaps(data.roadmaps);
    } catch (error) {
      console.log(error);
    }
  };

  const removeRoadmap = async (id) => {
    try {
      await deleteRoadmap(id);
      loadRoadmaps();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen p-6 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">

        <RoadmapHeader />

        {/* Generator */}

        <div className="mt-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl p-6 transition-all">

          <GoalSelector
            goal={goal}
            setGoal={setGoal}
          />

          <SkillLevel
            level={level}
            setLevel={setLevel}
          />

          <TimelineSelector
            duration={duration}
            setDuration={setDuration}
          />

          <button
            onClick={generate}
            disabled={loading}
            className="
              w-full
              mt-6

              rounded-xl

              bg-cyan-500
              hover:bg-cyan-600

              text-white
              font-semibold

              py-3

              shadow-lg
              shadow-cyan-500/20

              transition-all
              duration-300

              hover:-translate-y-0.5
            "
          >
            {loading ? "Generating..." : "Generate AI Roadmap"}
          </button>

        </div>

        {/* AI Output */}

        <RoadmapOutput roadmap={roadmap} />

        {/* Progress */}

        <ProgressTracker roadmap={roadmap} />

        {/* Buttons */}

        {roadmap.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-8">

            <button
              onClick={save}
              className="
                px-6
                py-3
                rounded-xl

                bg-green-600
                hover:bg-green-700

                text-white

                transition-all
              "
            >
              Save Roadmap
            </button>

            <ExportRoadmap roadmap={roadmap} />

          </div>
        )}

        {/* Saved Roadmaps */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
            Saved Roadmaps
          </h2>

          {savedRoadmaps.length === 0 ? (

            <div className="
              rounded-xl
              border
              border-gray-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-800

              shadow-lg

              p-6

              text-center

              text-gray-500
              dark:text-slate-400
            ">
              No Roadmaps Saved
            </div>

          ) : (

            <div className="space-y-4">

              {savedRoadmaps.map((item) => (

                <div
                  key={item._id}
                  className="
                    flex
                    justify-between
                    items-center

                    rounded-xl

                    border
                    border-gray-200
                    dark:border-slate-700

                    bg-white
                    dark:bg-slate-800

                    shadow-lg

                    p-5
                  "
                >

                  <div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {item.goal}
                    </h3>

                    <p className="text-gray-600 dark:text-slate-400">
                      {item.level} • {item.duration}
                    </p>

                  </div>

                  <button
                    onClick={() => removeRoadmap(item._id)}
                    className="
                      px-5
                      py-2

                      rounded-lg

                      bg-red-600
                      hover:bg-red-700

                      text-white

                      transition-all
                    "
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Roadmap;