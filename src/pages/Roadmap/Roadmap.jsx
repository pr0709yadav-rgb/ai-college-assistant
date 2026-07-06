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

  const [level, setLevel] =
    useState("Beginner");

  const [duration, setDuration] =
    useState("3 Months");

  const [roadmap, setRoadmap] =
    useState([]);

  const [savedRoadmaps, setSavedRoadmaps] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ==============================
  // Generate AI Roadmap
  // ==============================

  const generate = async () => {
    if (!goal) {
      return alert(
        "Please select a goal."
      );
    }

    try {
      setLoading(true);

      const data =
        await generateRoadmap({
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

  // ==============================
  // Save Roadmap
  // ==============================

  const save = async () => {
    try {

      await saveRoadmap({
        goal,
        level,
        duration,
        roadmap,
      });

      alert(
        "Roadmap Saved Successfully!"
      );

      loadRoadmaps();

    } catch (error) {

      console.log(error);

    }
  };

  // ==============================
  // Load Saved Roadmaps
  // ==============================

  const loadRoadmaps = async () => {
    try {

      const data =
        await getRoadmaps();

      setSavedRoadmaps(
        data.roadmaps
      );

    } catch (error) {

      console.log(error);

    }
  };

  // ==============================
  // Delete Roadmap
  // ==============================

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

      <div className="p-6 bg-gray-100 min-h-screen">

        <RoadmapHeader />

        {/* Generator */}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mt-6">

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
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition duration-300"
          >
            {loading
              ? "Generating..."
              : "Generate AI Roadmap"}
          </button>

        </div>

        {/* AI Output */}

        <RoadmapOutput
          roadmap={roadmap}
        />

        {/* Progress */}

        <ProgressTracker
          roadmap={roadmap}
        />

        {/* Buttons */}

        {roadmap.length > 0 && (

          <div className="flex gap-4 mt-8">

            <button
              onClick={save}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Save Roadmap
            </button>

            <ExportRoadmap
              roadmap={roadmap}
            />

          </div>

        )}

        {/* Saved Roadmaps */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Saved Roadmaps
          </h2>

          {savedRoadmaps.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">

              No Roadmaps Saved

            </div>

          ) : (

            <div className="space-y-4">

              {savedRoadmaps.map(
                (item) => (

                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="font-bold text-lg">
                        {item.goal}
                      </h3>

                      <p className="text-gray-500">
                        {item.level} •{" "}
                        {item.duration}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        removeRoadmap(
                          item._id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Roadmap;