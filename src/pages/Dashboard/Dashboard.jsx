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
        <h2 className="text-4xl font-bold text-white">
          Good Evening 👋
        </h2>

        <p className="mt-2 text-slate-400">
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

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="mb-5 text-xl font-bold">
            ⚡ Quick Actions
          </h3>

          <div className="space-y-4">
            {actions.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="flex items-center justify-between rounded-2xl bg-slate-800 p-4 transition hover:bg-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className="text-cyan-400">
                    {item.icon}
                  </div>

                  {item.title}
                </div>

                →
              </Link>
            ))}
          </div>
        </div>

        {/* Weekly Progress */}

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="mb-6 text-xl font-bold">
            📈 Weekly Progress
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between">
                <span>AI Usage</span>

                <span>{stats.aiUsage}%</span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-slate-700">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                  style={{
                    width: `${stats.aiUsage}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <span>AI Chats</span>

              <span>{stats.chatCount}</span>
            </div>

            <div className="flex justify-between">
              <span>Uploaded PDFs</span>

              <span>{stats.pdfCount}</span>
            </div>

            <div className="flex justify-between">
              <span>Roadmaps</span>

              <span>{stats.roadmaps}</span>
            </div>
          </div>
        </div>

        {/* Today's Goal */}

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="mb-5 text-xl font-bold">
            🎯 Today's Goal
          </h3>

          <div className="space-y-4 text-slate-300">
            <label className="flex gap-3">
              <input type="checkbox" />
              Solve 2 Coding Questions
            </label>

            <label className="flex gap-3">
              <input type="checkbox" />
              Read 1 PDF
            </label>

            <label className="flex gap-3">
              <input type="checkbox" />
              Practice Interview
            </label>

            <label className="flex gap-3">
              <input type="checkbox" />
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