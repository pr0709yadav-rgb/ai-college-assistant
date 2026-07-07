import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import ChatInput from "../Chat/ChatInput";
import MessageBubble from "../Chat/MessageBubble";

import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";

import { chatWithPdf } from "../../services/pdfServices";

const ChatWindow = ({ selectedPdf }) => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // ===============================
  // Auto Scroll
  // ===============================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ===============================
  // Reset Chat
  // ===============================

  useEffect(() => {
    setMessages([]);
  }, [selectedPdf]);

  // ===============================
  // Send Question
  // ===============================

  const handleSend = async () => {
    if (!question.trim()) return;

    if (!selectedPdf) {
      toast.error("Please select a PDF first.");
      return;
    }

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const response = await chatWithPdf(
        selectedPdf._id,
        userQuestion
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: response.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // No PDF Selected
  // ===============================

  if (!selectedPdf) {
    return <EmptyState />;
  }

  return (
    <div className="flex h-full flex-col">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">

        <div>

          <h2 className="text-lg font-semibold text-white">
            📄 Active PDF
          </h2>

          <p className="mt-1 truncate text-sm text-slate-400 max-w-lg">
            {selectedPdf.originalName}
          </p>

        </div>

        <button
          onClick={() =>
            navigate(`/pdf-viewer/${selectedPdf._id}`)
          }
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-slate-600
            px-4
            py-2
            text-sm
            text-cyan-400
            transition
            hover:bg-slate-800
          "
        >
          <Eye size={18} />
          Open PDF
        </button>

      </div>

      {/* Chat Area */}

      <div className="flex-1 overflow-y-auto p-6">

        {messages.length === 0 ? (

          <div className="flex h-full flex-col items-center justify-center text-center">

            <div className="mb-6 text-6xl">
              📄
            </div>

            <h2 className="text-2xl font-bold text-white">
              Ask anything about your PDF
            </h2>

            <p className="mt-3 max-w-md text-slate-400 leading-7">
              Get summaries, explanations,
              MCQs, interview questions,
              and more.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                sender={message.sender}
                text={message.text}
              />
            ))}

            {loading && <LoadingMessage />}

            <div ref={bottomRef} />

          </div>

        )}

      </div>

            {/* Input */}

      <ChatInput
        value={question}
        onChange={setQuestion}
        onSend={handleSend}
        loading={loading}
        placeholder="Ask anything about this PDF..."
      />

    </div>
  );
};

export default ChatWindow;