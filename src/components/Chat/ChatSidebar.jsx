import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaComments,
  FaHome,
  FaGraduationCap,
} from "react-icons/fa";

const chatTopics = [
  "📚 Study Help",
  "💻 Programming",
  "📝 Assignments",
  "🤖 AI & Machine Learning",
  "🧮 DSA Practice",
  "📄 Resume Review",
  "🎯 Interview Preparation",
  "📖 Exam Preparation",
];
const ChatSidebar = () => {
  return (
    <aside className="hidden h-screen w-[300px] shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:flex">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-6 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-lg text-white shadow-lg">
            <FaGraduationCap />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
              AI Assistant
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
              Powered Learning
            </p>
          </div>
        </div>
      </div>

      {/* New Chat */}
      <div className="p-5">
        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-5 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
          <FaPlus />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="px-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" />

          <input
            type="text"
            placeholder="Search chats..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-500 outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Recent Chats */}
      <div className="mt-7 flex-1 overflow-y-auto px-5">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
           Ask Me About
        </h2>

        <div className="space-y-2">
          {chatTopics.map((topic) => (
            <button
              key={topic}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FaComments className="text-cyan-500 transition group-hover:scale-110" />

              <span className="truncate text-[15px] font-medium text-slate-800 dark:text-slate-200">
                {topic}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard */}
      <div className="border-t border-slate-200 p-5 dark:border-slate-800">
        <Link
          to="/dashboard"
          className="flex items-center justify-center gap-3 rounded-xl bg-slate-100 px-5 py-3.5 text-base font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          <FaHome />
          Dashboard
        </Link>
      </div>
    </aside>
  );
};

export default ChatSidebar;