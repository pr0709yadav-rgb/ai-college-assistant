import { FileText } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">

      <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center">

        <FileText
          size={45}
          className="text-indigo-400"
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        No PDF Selected
      </h2>

      <p className="mt-3 text-slate-400 leading-relaxed">

        Upload a PDF or select one from your library
        to start chatting with your AI College Assistant.

      </p>

    </div>
  );
};

export default EmptyState;