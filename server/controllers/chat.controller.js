import Chat from "../models/chat.js";
import Activity from "../models/activity.js";
import { askGemini } from "../service/gemini.service.js";

// ==========================================
// Chat with AI
// ==========================================
export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Save User Message
    await Chat.create({
      user: req.user.id,
      role: "user",
      message,
    });

    // AI Response
    const reply = await askGemini(message);

    // Save AI Response
    await Chat.create({
      user: req.user.id,
      role: "assistant",
      message: reply,
    });

    // ==============================
    // Save Activity
    // ==============================
    await Activity.create({
      user: req.user.id,
      module: "AI Chat",
      action:
        message.length > 60
          ? message.substring(0, 60) + "..."
          : message,
    });

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Chat History
// ==========================================
export const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Chat History
// ==========================================
export const deleteChatHistory = async (req, res) => {
  try {
    await Chat.deleteMany({
      user: req.user.id,
    });

    await Activity.create({
      user: req.user.id,
      module: "AI Chat",
      action: "Deleted chat history",
    });

    res.status(200).json({
      success: true,
      message: "Chat history deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};