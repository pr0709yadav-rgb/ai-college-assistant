import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


function ChatHeader() {
  return (
    <div className="flex items-center justify-between">

  <div>
    <h1 className="text-4xl font-bold text-cyan-400">
      AI College Assistant
    </h1>

    <p className="text-gray-400 mt-2">
      Ask anything about coding, resume, syllabus or placements.
    </p>
  </div>

  <Link
    to="/dashboard"
    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl transition"
  >
    <ArrowLeft size={20} />
    Dashboard
  </Link>

</div>
  );
}

export default ChatHeader;