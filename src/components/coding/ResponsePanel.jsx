import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import LoadingState from "./LoadingState";
import CopyResponseButton from "./CopyResponseButton";
import DownloadResponseButton from "./DownloadResponseButton";
import RegenerateButton from "./RegenerateButton";

const ResponsePanel = ({
  response,
  loading,
  onRegenerate,
}) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 h-[760px] flex flex-col">

      {/* Header */}

      <div className="flex items-center justify-between mb-4 flex-shrink-0">

        <h2 className="text-2xl font-bold text-white">
          AI Response
        </h2>

        <div className="flex items-center gap-2">

          <RegenerateButton
            onRegenerate={onRegenerate}
            loading={loading}
          />

          <CopyResponseButton
            response={response}
          />

          <DownloadResponseButton
            response={response}
          />

        </div>

      </div>

      {/* Body */}

      <div className="flex-1 rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">

        {loading ? (

          <div className="h-full flex items-center justify-center">
            <LoadingState />
          </div>

        ) : response ? (

          <div className="h-full overflow-y-auto p-6">

            <article
              className="
                prose
                prose-invert
                max-w-none

                prose-headings:text-white
                prose-p:text-slate-300
                prose-li:text-slate-300
                prose-strong:text-white

                prose-pre:bg-[#0f172a]
                prose-pre:border
                prose-pre:border-slate-700
                prose-pre:rounded-xl

                prose-code:text-cyan-300
                prose-code:before:content-none
                prose-code:after:content-none
              "
            >
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
              >
                {response}
              </ReactMarkdown>

            </article>

          </div>

        ) : (

          <div className="h-full flex items-center justify-center">

            <div className="text-center">

              <div className="text-6xl mb-5">
                💻
              </div>

              <h3 className="text-2xl font-bold text-white">
                AI Coding Assistant
              </h3>

              <p className="text-slate-400 mt-3 max-w-md mx-auto">
                Enter a prompt and your source code to generate
                explanations, debug errors, optimize code,
                convert languages or solve programming problems.
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default ResponsePanel;