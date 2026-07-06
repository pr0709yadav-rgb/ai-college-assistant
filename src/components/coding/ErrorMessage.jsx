const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="flex items-start justify-between gap-4 bg-red-500/10 border border-red-500 rounded-lg p-4">

      <div>
        <h3 className="text-red-400 font-semibold">
          Error
        </h3>

        <p className="text-red-200 text-sm mt-1">
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="text-red-400 hover:text-red-300 text-lg font-bold"
      >
        ✕
      </button>

    </div>
  );
};

export default ErrorMessage;