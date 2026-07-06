import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    faculty: {
      type: String,
      default: "",
      trim: true,
    },

    present: {
      type: Number,
      default: 0,
      min: 0,
    },

    absent: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumAttendance: {
      type: Number,
      default: 75,
    },

    history: [
      {
        date: {
          type: Date,
          default: Date.now,
        },

        status: {
          type: String,
          enum: ["Present", "Absent"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

attendanceSchema.virtual("totalClasses").get(function () {
  return this.present + this.absent;
});

attendanceSchema.virtual("attendancePercentage").get(function () {
  const total = this.present + this.absent;

  if (total === 0) return 0;

  return Number(
    ((this.present / total) * 100).toFixed(2)
  );
});

attendanceSchema.set("toJSON", {
  virtuals: true,
});

attendanceSchema.set("toObject", {
  virtuals: true,
});

const Attendance =
  mongoose.models.Attendance ||
  mongoose.model(
    "Attendance",
    attendanceSchema
  );

export default Attendance;