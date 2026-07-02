function ChatInput({
  value,
  onChange,
  placeholder = "Ask AI anything...",
  onSend,
  loading = false,
}) {
  return (
    <div className="bg-slate-900 border-t border-slate-800 p-5">

      <div className="flex gap-4">

        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !loading
            ) {
              onSend();
            }
          }}
          type="text"
          placeholder={placeholder}
          className="
            flex-1
            bg-slate-800
            rounded-xl
            px-5
            py-3
            outline-none
            text-white
          "
        />

        <button
          disabled={loading}
          onClick={onSend}
          className="
            bg-cyan-500
            hover:bg-cyan-400
            disabled:bg-slate-700
            px-8
            rounded-xl
            font-semibold
            transition
          "
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>
  );
}

export default ChatInput;