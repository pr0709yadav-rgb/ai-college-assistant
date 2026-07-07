import Chat from "../models/chat.js";
import Pdf from "../models/pdf.js";
import Roadmap from "../models/roadmap.js";
import Attendance from "../models/attendance.js";
import Resume from "../models/resume.js";
import Activity from "../models/activity.js";

export const getDashboard = async (req, res) => {
  try {
    // ==============================
    // Counts
    // ==============================

    const chatCount = await Chat.countDocuments({
      user: req.user.id,
    });

    const pdfCount = await Pdf.countDocuments({
      user: req.user.id,
    });

    const roadmapCount = await Roadmap.countDocuments({
      user: req.user.id,
    });

    // ==============================
    // Attendance
    // ==============================

    const attendanceList = await Attendance.find({
      user: req.user.id,
    });

    let totalPresent = 0;
    let totalClasses = 0;

    attendanceList.forEach((item) => {
      totalPresent += item.present;
      totalClasses += item.present + item.absent;
    });

    const attendance =
      totalClasses === 0
        ? 0
        : Number(
            (
              (totalPresent / totalClasses) *
              100
            ).toFixed(2)
          );

    // ==============================
    // Resume
    // ==============================

    const resume = await Resume.findOne({
      user: req.user.id,
    });

    const resumeScore =
      resume?.resumeScore || 0;

    // ==============================
    // Recent Activity
    // ==============================

    const activity = await Activity.find({
      user: req.user.id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(8);

    // ==============================
    // AI Usage
    // ==============================

    const aiUsage = Math.min(
      100,
      chatCount +
        pdfCount +
        roadmapCount * 2
    );

    // ==============================
    // Dashboard
    // ==============================

    res.status(200).json({
      success: true,

      stats: {
        chatCount,

        pdfCount,

        roadmaps: roadmapCount,

        attendance,

        resumeScore,

        aiUsage,
      },

      activity,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};