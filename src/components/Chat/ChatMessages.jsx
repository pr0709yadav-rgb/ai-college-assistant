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
    <div className="flex-1 overflow-y-auto p-8 space-y-5">

      {messages.length === 0 && !loading && (

        <div className="flex flex-col items-center justify-center h-full">

          <h2 className="text-3xl font-bold text-cyan-400">
            AI College Assistant
          </h2>

          <p className="text-slate-400 mt-3">
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