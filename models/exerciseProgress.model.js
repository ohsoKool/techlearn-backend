import mongoose from "mongoose";

const exerciseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    status: {
      type: String,
      enum: ["yet-to-start", "completed"],
      default: "yet-to-start",
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ExerciseProgress = mongoose.model(
  "ExerciseProgress",
  exerciseProgressSchema
);
export default ExerciseProgress;
