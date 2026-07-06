const DownloadResponseButton = ({ response }) => {
  const handleDownload = () => {
    if (!response) return;

    const blob = new Blob([response], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-response.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!response}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition
      ${
        response
          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
          : "bg-slate-700 text-slate-400 cursor-not-allowed"
      }`}
    >
      Download
    </button>
  );
};

export default DownloadResponseButton;