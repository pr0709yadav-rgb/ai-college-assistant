const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[520px]">

      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />

      {/* Text */}
      <h3 className="text-white text-lg font-semibold mt-6">
        AI is thinking...
      </h3>

      <p className="text-slate-400 mt-2 text-center">
        Please wait while the assistant generates the best possible answer.
      </p>

    </div>
  );
};

export default LoadingState;