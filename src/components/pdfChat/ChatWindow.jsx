import { useEffect, useRef, useState } from "react";

import { Bot } from "lucide-react";

import toast from "react-hot-toast";

import ChatInput from "../Chat/ChatInput";
import MessageBubble from "../Chat/MessageBubble";

import LoadingMessage from "./LoadingMessage";
import EmptyState from "./EmptyState";

import { chatWithPdf } from "../../services/pdfServices";

const ChatWindow = ({ selectedPdf }) => {
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
  // Reset chat when PDF changes
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
            error.message ||
            "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Empty State
  // ===============================

  if (!selectedPdf) {
    return <EmptyState />;
  }

  return (
    <div className="h-full flex flex-col">

      {/* Header */}

      <div className="border-b border-slate-700 p-5">

        <div className="flex items-center gap-3">

          <Bot
            className="text-cyan-400"
            size={22}
          />

          <div>

            <h2 className="text-white font-semibold">
              AI PDF Assistant
            </h2>

            <p className="text-xs text-slate-400 truncate max-w-[260px]">
              {selectedPdf.originalName}
            </p>

          </div>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {messages.length === 0 && (

          <div className="text-center mt-16">

            <Bot
              size={60}
              className="mx-auto text-cyan-400"
            />

            <h3 className="mt-5 text-xl text-white font-semibold">

              Ask Anything

            </h3>

            <p className="mt-2 text-slate-400">

              Ask questions about the selected PDF.

            </p>

          </div>

        )}

        {messages.map((message, index) => (

          <MessageBubble
            key={index}
            sender={message.sender}
            text={message.text}
          />

        ))}

        {loading && <LoadingMessage />}

        <div ref={bottomRef}></div>

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