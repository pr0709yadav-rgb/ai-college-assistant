import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaComments,
  FaHome,
} from "react-icons/fa";

const dummyChats = [
  "React Components",
  "Node.js Error",
  "MongoDB Atlas",
  "Resume Review",
  "AI Project",
  "Interview Prep",
];

const ChatSidebar = () => {
  return (
    <aside className="w-[260px] h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">
          🤖 AI ASSISTANT
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          AI Powered Learning
        </p>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button
          className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-600
          text-white
          py-3
          font-medium
          transition-all
          duration-300"
        >
          <FaPlus />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3">
          <FaSearch className="text-slate-500" />

          <input
            placeholder="Search chats..."
            className="bg-transparent outline-none text-sm flex-1 text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-4 mt-6">

        <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-4">
          Recent Chats
        </h2>

        <div className="space-y-2">
          {dummyChats.map((chat, index) => (
            <button
              key={index}
              className="
              w-full
              flex
              items-center
              gap-3
              rounded-lg
              px-3
              py-3
              text-slate-300
              hover:bg-slate-900
              hover:text-white
              transition"
            >
              <FaComments
                className="text-cyan-400"
              />

              <span className="truncate text-sm">
                {chat}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-4">

        <Link
          to="/dashboard"
          className="
          flex
          items-center
          gap-3
          rounded-xl
          bg-slate-900
          hover:bg-slate-800
          text-white
          px-4
          py-3
          transition"
        >
          <FaHome />

          Dashboard
        </Link>

      </div>

    </aside>
  );
};

export default ChatSidebar;