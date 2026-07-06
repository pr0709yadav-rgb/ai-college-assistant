import Editor from "@monaco-editor/react";

const CodeEditor = ({
  language,
  code,
  setCode,
}) => {
  return (
    <div className="h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">

        <label className="text-lg font-semibold text-white">
          Source Code
        </label>

        <span className="text-sm text-slate-400">
          Monaco Editor
        </span>

      </div>

      {/* Editor */}
      <div className="flex-1 rounded-xl overflow-hidden border border-slate-700">

        <Editor
          language={language}
          value={code}
          theme="vs-dark"
          height="100%"
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: {
              enabled: false,
            },

            fontSize: 15,

            automaticLayout: true,

            scrollBeyondLastLine: false,

            wordWrap: "on",

            tabSize: 2,

            insertSpaces: true,

            formatOnPaste: true,

            formatOnType: true,

            smoothScrolling: true,

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation: "on",

            padding: {
              top: 16,
              bottom: 16,
            },
          }}
        />

      </div>

    </div>
  );
};

export default CodeEditor;