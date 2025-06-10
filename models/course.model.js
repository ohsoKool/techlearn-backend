import mongoose from "mongoose";

const chapterSchema = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
};

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    chapters: {
      type: [chapterSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
