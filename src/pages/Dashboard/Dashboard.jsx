import { useEffect, useState } from "react";

import {
  FaRobot,
  FaCode,
  FaFileAlt,
  FaCalendarAlt,
  FaPlay,
  FaUpload,
  FaFileSignature,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

import { getDashboard } from "../../services/dashboard.service";

const actions = [
  {
    title: "Start AI Chat",
    icon: <FaPlay />,
    path: "/chat",
  },
  {
    title: "Upload PDF",
    icon: <FaUpload />,
    path: "/pdf-chat",
  },
  {
    title: "Coding Practice",
    icon: <FaCode />,
    path: "/coding",
  },
  {
    title: "Resume Analyzer",
    icon: <FaFileSignature />,
    path: "/resume",
  },
];

function Dashboard() {
  const [stats, setStats] = useState({
    chatCount: 0,
    pdfCount: 0,
    attendance: 0,
    resumeScore: 0,
    roadmaps: 0,
    aiUsage: 0,
  });

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();

      setStats(data.stats);
      setActivity(data.activity);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      {/* Greeting */}

      <div className="mb-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Good Evening 👋
        </h2>

        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Continue your AI learning journey.
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="AI Chat"
          value={stats.chatCount}
          color="from-indigo-500 to-cyan-500"
          icon={<FaRobot />}
          path="/chat"
        />

        <DashboardCard
          title="Resume Score"
          value={`${stats.resumeScore}%`}
          color="from-purple-500 to-pink-500"
          icon={<FaCode />}
          path="/resume"
        />

        <DashboardCard
          title="PDF Chat"
          value={`${stats.pdfCount} PDFs`}
          color="from-orange-500 to-red-500"
          icon={<FaFileAlt />}
          path="/pdf-chat"
        />

        <DashboardCard
          title="Attendance"
          value={`${stats.attendance}%`}
          color="from-green-500 to-emerald-500"
          icon={<FaCalendarAlt />}
          path="/attendance"
        />
      </div>

      {/* Middle */}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        {/* Quick Actions */}

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-white">
          ⚡ Quick Actions
        </h3>

      <div className="space-y-3">
        {actions.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-4
            py-3
            text-slate-700
            transition-all
            duration-300
            hover:border-indigo-500
            hover:bg-indigo-50
            hover:shadow-md
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            dark:hover:bg-slate-700
          "
          >
            <div className="flex items-center gap-3">
              <div className="text-cyan-500 dark:text-cyan-400">
                {item.icon}
              </div>
        
              <span className="font-medium">
                {item.title}
              </span>
            </div>
        
            <span className="text-slate-500 dark:text-slate-300">
              →
            </span>
          </Link>
            ))}
          </div>
        </div>

        {/* Weekly Progress */}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">

        <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-white">
          📈 Weekly Progress
        </h3>

        <div className="space-y-3">

          <div>

            <div className="mb-2 flex justify-between text-sm">

              <span className="font-medium text-slate-700 dark:text-slate-300">
                AI Usage
              </span>

              <span className="font-semibold text-slate-800 dark:text-white">
                {stats.aiUsage}%
              </span>

            </div>

            <div className="h-2 rounded-full bg-slate-300 dark:bg-slate-700">

              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                style={{
                  width: `${stats.aiUsage}%`,
                }}
              />

            </div>
              
          </div>
              
          <div className="flex justify-between text-sm">
              
            <span className="text-slate-700 dark:text-slate-300">
              AI Chats
            </span>
              
            <span className="font-semibold text-slate-800 dark:text-white">
              {stats.chatCount}
            </span>
              
          </div>
              
          <div className="flex justify-between text-sm">
              
            <span className="text-slate-700 dark:text-slate-300">
              PDFs
            </span>
              
            <span className="font-semibold text-slate-800 dark:text-white">
              {stats.pdfCount}
            </span>
              
          </div>
              
          <div className="flex justify-between text-sm">
              
            <span className="text-slate-700 dark:text-slate-300">
              Roadmaps
            </span>
              
            <span className="font-semibold text-slate-800 dark:text-white">
              {stats.roadmaps}
            </span>
              
          </div>
              
        </div>
              
      </div>

        {/* Today's Goal */}

<div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">

  <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-white">
    🎯 Today's Goal
  </h3>

  <div className="space-y-3 text-sm">

    <label className="flex items-center gap-3 text-slate-700 dark:text-slate-300">

      <input
        type="checkbox"
        className="accent-indigo-600"
      />

      Solve 2 Coding Questions

    </label>

    <label className="flex items-center gap-3 text-slate-700 dark:text-slate-300">

      <input
        type="checkbox"
        className="accent-indigo-600"
      />

      Read 1 PDF

    </label>

    <label className="flex items-center gap-3 text-slate-700 dark:text-slate-300">

      <input
        type="checkbox"
        className="accent-indigo-600"
      />

      Practice Interview

    </label>

    <label className="flex items-center gap-3 text-slate-700 dark:text-slate-300">

      <input
        type="checkbox"
        className="accent-indigo-600"
      />

      Improve Resume

    </label>

  </div>

</div>
      </div>

      {/* Recent Activity */}

      <div className="mt-8">
        <RecentActivity activity={activity} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;