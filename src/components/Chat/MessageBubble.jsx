import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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
        className={`flex max-w-[92%] gap-3 md:max-w-[82%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
            isUser
              ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
              : "border border-slate-200 bg-white text-cyan-600 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-cyan-300"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Bubble */}

        <div
          className={`group relative rounded-2xl px-5 py-4 shadow-lg transition-all duration-200 ${
            isUser
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              : "border border-slate-200/80 bg-white/85 text-slate-800 backdrop-blur hover:border-cyan-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100"
          }`}
        >
          {/* Header */}

          <div className="mb-3 flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isUser
                  ? "text-cyan-100"
                  : "text-cyan-600 dark:text-cyan-300"
              }`}
            >
              {isUser ? "You" : "AI Assistant"}
            </span>

            {!isUser && (
              <button
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-white/[0.08]"
              >
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} className="text-slate-400" />
                )}
              </button>
            )}
          </div>

          {/* Message */}

          {isUser ? (
            <div className="whitespace-pre-wrap break-words leading-7 text-[15px]">
              {text}
            </div>
          ) : (
            <div
              className="
                prose
                prose-slate
                dark:prose-invert
                max-w-none

                prose-headings:font-bold
                prose-headings:text-slate-900
                dark:prose-headings:text-white

                prose-p:leading-7
                prose-p:my-3

                prose-li:my-1

                prose-strong:text-slate-900
                dark:prose-strong:text-white

                prose-code:text-pink-600
                dark:prose-code:text-pink-300

                prose-code:bg-slate-100
                dark:prose-code:bg-slate-800

                prose-code:px-1
                prose-code:py-0.5
                prose-code:rounded

                prose-code:before:content-none
                prose-code:after:content-none

                prose-pre:bg-slate-900
                prose-pre:border
                prose-pre:border-slate-700
                prose-pre:rounded-xl

                prose-table:border
                prose-table:border-slate-300
                dark:prose-table:border-slate-700

                prose-a:text-cyan-500
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;