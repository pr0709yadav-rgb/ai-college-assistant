import { Bot } from "lucide-react";

const LoadingMessage = () => {
  return (
    <div className="flex justify-start">

      <div className="max-w-xs rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">

        <div className="flex items-center gap-2 mb-3">

          <Bot
            size={16}
            className="text-cyan-500 dark:text-cyan-300"
          />

          <span className="text-xs font-semibold text-slate-700 dark:text-white">
            AI Assistant
          </span>

        </div>

        <div className="flex gap-2">

          <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
            style={{
              animationDelay: "0.2s",
            }}
          ></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
            style={{
              animationDelay: "0.4s",
            }}
          ></span>

        </div>

      </div>

    </div>
  );
};

export default LoadingMessage;
