import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg h-[760px] flex flex-col transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-slate-700">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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

      <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors">

        {loading ? (

          <div className="h-full flex items-center justify-center">
            <LoadingState />
          </div>

        ) : response ? (

          <div className="h-full overflow-y-auto p-7 custom-scrollbar">

            <article
              className="
                prose
                dark:prose-invert
                max-w-none

                prose-headings:font-bold
                prose-headings:scroll-mt-24

                prose-h1:text-3xl
                prose-h2:text-2xl
                prose-h3:text-xl

                prose-headings:text-gray-900
                dark:prose-headings:text-white

                prose-p:text-gray-700
                dark:prose-p:text-slate-300
                prose-p:leading-8

                prose-li:text-gray-700
                dark:prose-li:text-slate-300

                prose-strong:text-gray-900
                dark:prose-strong:text-white

                prose-a:text-cyan-600
                dark:prose-a:text-cyan-400
                prose-a:no-underline
                hover:prose-a:underline

                prose-blockquote:border-cyan-500
                prose-blockquote:text-gray-600
                dark:prose-blockquote:text-slate-400

                prose-code:bg-gray-200
                dark:prose-code:bg-slate-800

                prose-code:px-1.5
                prose-code:py-1
                prose-code:rounded-md

                prose-code:text-pink-600
                dark:prose-code:text-cyan-300

                prose-code:before:content-none
                prose-code:after:content-none

                prose-pre:bg-[#111827]
                dark:prose-pre:bg-[#0f172a]

                prose-pre:border
                prose-pre:border-gray-300
                dark:prose-pre:border-slate-700

                prose-pre:rounded-xl
                prose-pre:shadow-lg

                prose-img:rounded-xl

                prose-table:border
                prose-table:border-gray-300
                dark:prose-table:border-slate-700

                prose-th:border
                prose-th:border-gray-300
                dark:prose-th:border-slate-700

                prose-td:border
                prose-td:border-gray-300
                dark:prose-td:border-slate-700

                prose-th:bg-gray-100
                dark:prose-th:bg-slate-800
              "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {response}
              </ReactMarkdown>
            </article>

          </div>

        ) : (

          <div className="h-full flex items-center justify-center p-8">

            <div className="max-w-md text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-4xl mb-6">
                🤖
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Coding Assistant
              </h3>

              <p className="mt-3 text-gray-600 dark:text-slate-400">
                Ask anything about your code. The AI can explain,
                debug, optimize, generate, refactor, or convert code
                into another programming language.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-6">

                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-sm">
                  Explain
                </span>

                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-sm">
                  Debug
                </span>

                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-sm">
                  Optimize
                </span>

                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-sm">
                  Refactor
                </span>

                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-sm">
                  Convert
                </span>

                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-sm">
                  Generate
                </span>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default ResponsePanel;