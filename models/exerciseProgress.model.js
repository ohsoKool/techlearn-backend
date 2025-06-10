import mongoose from "mongoose";

const exerciseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exerciseId: {
      type: String, // or Number depending on your exercise ID system
      required: true,
    },
    status: {
      type: String,
      enum: ["yet-to-start", "completed", "in-progress"],
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

exerciseProgressSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });

export const ExerciseProgress = mongoose.model(
  "ExerciseProgress",
  exerciseProgressSchema
);
