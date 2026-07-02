import { Bot } from "lucide-react";

const LoadingMessage = () => {
  return (
    <div className="flex justify-start">

      <div className="bg-slate-700 rounded-xl px-4 py-3 max-w-xs">

        <div className="flex items-center gap-2 mb-3">

          <Bot
            size={16}
            className="text-indigo-400"
          />

          <span className="text-xs text-white">
            AI Assistant
          </span>

        </div>

        <div className="flex gap-2">

          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>

          <span
            className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
            style={{
              animationDelay: "0.2s",
            }}
          ></span>

          <span
            className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
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