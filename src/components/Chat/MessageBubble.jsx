import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

function MessageBubble({
  sender,
  text,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[85%] rounded-2xl p-4 shadow-md ${
          isUser
            ? "bg-cyan-500 text-white"
            : "bg-slate-800 border border-slate-700 text-white"
        }`}
      >
        <div className="flex items-center justify-between mb-3">

          <div className="flex items-center gap-2">

            {isUser ? (
              <User size={16} />
            ) : (
              <Bot
                size={16}
                className="text-cyan-400"
              />
            )}

            <span className="text-xs font-semibold">
              {isUser ? "You" : "AI Assistant"}
            </span>

          </div>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="hover:text-cyan-400 transition"
            >
              {copied ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          )}

        </div>

        <div className="whitespace-pre-wrap break-words leading-7 text-sm">
          {text}
        </div>

      </div>
    </div>
  );
}

export default MessageBubble;