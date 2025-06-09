const exerciseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Exercise",
    },
    status: {
      type: String,
      enum: ["yet-to-start", "in-progress", "completed"],
      default: "yet-to-start",
    },
    submittedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
