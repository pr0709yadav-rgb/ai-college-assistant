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
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

import { getDashboard } from "../../services/dashboard.service";

const actions = [
  {
    title: "Start AI Chat",
    description: "Ask study, code, and placement questions.",
    icon: <FaPlay />,
    path: "/chat",
  },
  {
    title: "Upload PDF",
    description: "Chat with notes, books, and papers.",
    icon: <FaUpload />,
    path: "/pdf-chat",
  },
  {
    title: "Coding Practice",
    description: "Generate explanations and solutions.",
    icon: <FaCode />,
    path: "/coding",
  },
  {
    title: "Resume Analyzer",
    description: "Improve your resume score.",
    icon: <FaFileSignature />,
    path: "/resume",
  },
];

const goals = [
  "Solve 2 coding questions",
  "Read 1 PDF",
  "Practice interview",
  "Improve resume",
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
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-400/10 dark:text-cyan-200">
            <Sparkles size={15} />
            Learning workspace
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Good Evening
          </h2>

          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-400">
            Continue your AI learning journey with a cleaner command center for every study workflow.
          </p>
        </div>

        <div className="surface-muted rounded-2xl px-5 py-4">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Weekly AI usage
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
            {stats.aiUsage}%
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
          color="from-fuchsia-500 to-rose-500"
          icon={<FaCode />}
          path="/resume"
        />

        <DashboardCard
          title="PDF Chat"
          value={`${stats.pdfCount} PDFs`}
          color="from-amber-500 to-orange-500"
          icon={<FaFileAlt />}
          path="/pdf-chat"
        />

        <DashboardCard
          title="Attendance"
          value={`${stats.attendance}%`}
          color="from-emerald-500 to-teal-500"
          icon={<FaCalendarAlt />}
          path="/attendance"
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <section className="premium-card p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Quick Actions
            </h3>
          </div>

          <div className="space-y-3">
            {actions.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3 text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-white hover:shadow-lg hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-white/[0.045] dark:text-white dark:hover:bg-white/[0.075]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-cyan-600 transition group-hover:bg-cyan-500 group-hover:text-white dark:bg-white/[0.07] dark:text-cyan-300">
                    {item.icon}
                  </div>

                  <div>
                    <span className="font-semibold">{item.title}</span>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-500"
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="premium-card p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Weekly Progress
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  AI Usage
                </span>
                <span className="font-semibold text-slate-950 dark:text-white">
                  {stats.aiUsage}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400"
                  style={{
                    width: `${stats.aiUsage}%`,
                  }}
                />
              </div>
            </div>

            {[
              ["AI Chats", stats.chatCount],
              ["PDFs", stats.pdfCount],
              ["Roadmaps", stats.roadmaps],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl bg-slate-100/70 px-4 py-3 text-sm dark:bg-white/[0.045]"
              >
                <span className="text-slate-600 dark:text-slate-400">
                  {label}
                </span>
                <span className="font-semibold text-slate-950 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="premium-card p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Today's Goal
            </h3>
          </div>

          <div className="space-y-3 text-sm">
            {goals.map((goal, index) => (
              <label
                key={goal}
                className="group flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200/70 bg-white/60 px-4 py-3 text-slate-700 transition-all hover:border-indigo-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-300 dark:hover:bg-white/[0.07]"
              >
                <input type="checkbox" className="peer sr-only" />
                <Circle
                  size={18}
                  className="text-slate-400 peer-checked:hidden"
                />
                <CheckCircle2
                  size={18}
                  className="hidden text-emerald-500 peer-checked:block"
                />
                <span className="peer-checked:text-slate-400 peer-checked:line-through">
                  {goal}
                </span>
                {index === 0 && (
                  <span className="ml-auto rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                    Priority
                  </span>
                )}
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6">
        <RecentActivity activity={activity} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
