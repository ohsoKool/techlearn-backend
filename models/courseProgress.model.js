import mongoose from "mongoose";

const completedChapterSchema = {
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  completedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now,
  },
};

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
    completedChapters: {
      type: [completedChapterSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Prevent multiple progress docs per user-course
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress;
