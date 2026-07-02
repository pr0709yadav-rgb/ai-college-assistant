function ChatSidebar() {
  const chats = [
    "DBMS Notes",
    "CN Questions",
    "Resume Review",
    "Java Interview",
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6">
      <button className="w-full bg-cyan-500 py-3 rounded-xl font-semibold mb-6">
        + New Chat
      </button>

      <h2 className="text-gray-400 mb-4">Recent Chats</h2>

      <div className="space-y-3">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="bg-slate-800 hover:bg-slate-700 rounded-lg p-3 cursor-pointer"
          >
            {chat}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default ChatSidebar;