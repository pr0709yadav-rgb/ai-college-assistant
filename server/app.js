import path from "path";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import codingRoutes from "./routes/coding.routes.js";
import forgotPasswordRoutes from "./routes/forgotPassword.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import roadmapRoutes from "./routes/roadmap.routes.js";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI College Assistant Backend Running 🚀",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/pdf", pdfRoutes);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/coding", codingRoutes);
app.use(
  "/api/auth",
  forgotPasswordRoutes
);
app.use(
  "/api/attendance",
  attendanceRoutes
);
app.use(
  "/api/roadmap",
  roadmapRoutes
);


export default app;

