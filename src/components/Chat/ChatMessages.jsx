import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import LoadingMessage from "../pdfChat/LoadingMessage";

function ChatMessages({
  messages,
  loading,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-8">

      {messages.length === 0 && !loading && (

        <div className="flex h-full flex-col items-center justify-center px-6 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-2xl font-bold text-white shadow-xl shadow-cyan-500/20">
            AI
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            AI College Assistant
          </h2>

          <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-400">
            Ask anything about coding, academics,
            projects, placements or interviews.
          </p>

        </div>

      )}

      {messages.map((msg, index) => (

        <MessageBubble
          key={index}
          sender={msg.sender}
          text={msg.text}
        />

      ))}

      {loading && <LoadingMessage />}

      <div ref={bottomRef}></div>

    </div>
  );
}

export default ChatMessages;
