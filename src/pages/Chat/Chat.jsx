import { useEffect, useState } from "react";

import ChatSidebar from "../../components/Chat/ChatSidebar";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatMessages from "../../components/Chat/ChatMessages";
import ChatInput from "../../components/Chat/ChatInput";

import {
  sendMessage,
  getChatHistory,
} from "../../services/chat.service";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================
  // Load Chat History
  // ==========================

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getChatHistory();

      const formatted = data.chats.map((chat) => ({
        sender:
          chat.role === "user"
            ? "user"
            : "assistant",
        text: chat.message,
      }));

      setMessages(formatted);

    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Send Message
  // ==========================

  const handleSend = async () => {
  console.log("Send button clicked");

  
    if (!question.trim()) return;

    const userMessage = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const data = await sendMessage(
        userMessage
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: data.reply,
        },
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text:
            error.response?.data?.message ||
            "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">

      <ChatSidebar />

      <div className="flex flex-col flex-1">

        <ChatHeader />

        <ChatMessages
          messages={messages}
          loading={loading}
        />

        <ChatInput
          value={question}
          onChange={setQuestion}
          onSend={handleSend}
          loading={loading}
        />

      </div>

    </div>
  );
}

export default Chat;