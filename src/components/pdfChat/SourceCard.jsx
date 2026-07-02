import { FileText } from "lucide-react";

const SourceCard = ({
  source,
  similarity,
}) => {
  return (
    <div
      className="
      bg-slate-800
      border
      border-slate-700
      rounded-xl
      p-4
      mt-3
    "
    >

      <div className="flex items-center gap-3">

        <FileText
          className="text-indigo-400"
          size={20}
        />

        <div>

          <h4 className="text-white font-medium">

            Source Document

          </h4>

          <p className="text-slate-400 text-sm">

            {source}

          </p>

        </div>

      </div>

      {similarity && (

        <div className="mt-4">

          <div className="flex justify-between text-xs text-slate-400">

            <span>Similarity</span>

            <span>

              {(similarity * 100).toFixed(1)}%

            </span>

          </div>

          <div className="w-full h-2 rounded-full bg-slate-700 mt-2 overflow-hidden">

            <div
              className="h-full bg-indigo-500"
              style={{
                width: `${similarity * 100}%`,
              }}
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default SourceCard;