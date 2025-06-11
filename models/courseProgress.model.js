import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedChapters: [
      {
        chapterId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Chapter",
          required: true,
        },
        completedAt: { type: Date, default: Date.now },
        lastUpdated: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress;
