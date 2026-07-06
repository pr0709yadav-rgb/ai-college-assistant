import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goal: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    roadmap: [
      {
        week: Number,

        title: String,

        tasks: [
          {
            task: String,

            completed: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Roadmap =
  mongoose.models.Roadmap ||
  mongoose.model(
    "Roadmap",
    roadmapSchema
  );

export default Roadmap;