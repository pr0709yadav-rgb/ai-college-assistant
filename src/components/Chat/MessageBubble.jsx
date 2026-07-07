import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

const MessageBubble = ({ sender, text }) => {
  const [copied, setCopied] = useState(false);

  const isUser = sender === "user";

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

  return (
    <div
      className={`flex w-full mb-5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-3 max-w-[90%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
            isUser
              ? "bg-cyan-500 text-white"
              : "bg-slate-800 border border-slate-700 text-cyan-400"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Bubble */}

        <div
          className={`group relative rounded-2xl px-5 py-4 shadow-lg transition-all duration-300 ${
            isUser
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              : "bg-slate-800/90 backdrop-blur border border-slate-700 text-slate-100 hover:border-cyan-500/40"
          }`}
        >
          {/* Header */}

          <div className="mb-3 flex items-center justify-between">

            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isUser
                  ? "text-cyan-100"
                  : "text-cyan-400"
              }`}
            >
              {isUser ? "You" : "AI Assistant"}
            </span>

            {!isUser && (
              <button
                onClick={handleCopy}
                className="
                  opacity-0
                  group-hover:opacity-100
                  transition
                  rounded-lg
                  p-1.5
                  hover:bg-slate-700
                "
              >
                {copied ? (
                  <Check
                    size={16}
                    className="text-green-400"
                  />
                ) : (
                  <Copy
                    size={16}
                    className="text-slate-400"
                  />
                )}
              </button>
            )}

          </div>

          {/* Message */}

          <div className="whitespace-pre-wrap break-words leading-7 text-[15px]">
            {text}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MessageBubble;