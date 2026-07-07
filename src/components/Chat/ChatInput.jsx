import { SendHorizontal, Loader2 } from "lucide-react";

const ChatInput = ({
  value,
  onChange,
  placeholder = "Ask AI anything...",
  onSend,
  loading = false,
}) => {
  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !loading
    ) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-slate-700 bg-slate-900 p-5">

      <div className="relative">

        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            w-full
            rounded-2xl
            border
            border-slate-700
            bg-slate-800
            py-4
            pl-6
            pr-20
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-500/20
          "
        />

        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? (
            <Loader2
              size={20}
              className="animate-spin"
            />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>

      </div>

      <div className="mt-3 flex items-center justify-between px-1">

        <p className="text-xs text-slate-500">
          Press <span className="font-semibold text-slate-300">Enter</span> to send
        </p>

        <p className="text-xs text-cyan-400">
          AI PDF Assistant
        </p>

      </div>

    </div>
  );
};

export default ChatInput;