import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    module: {
      type: String,
      required: true,
      enum: [
        "AI Chat",
        "PDF Chat",
        "Coding",
        "Resume",
        "Attendance",
        "Roadmap",
        "Interview",
      ],
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Activity =
  mongoose.models.Activity ||
  mongoose.model("Activity", activitySchema);

export default Activity;