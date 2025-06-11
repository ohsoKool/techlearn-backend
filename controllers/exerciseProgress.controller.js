import ExerciseProgress from "../models/exerciseProgress.model.js";
export const markExerciseAsCompleted = async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const userId = req.user._id;

    if (!exerciseId) {
      return res.status(400).json({ message: "Exercise ID is required" });
    }

    const updatedProgress = await ExerciseProgress.findOneAndUpdate(
      { userId, exerciseId },
      {
        status: "completed",
        submittedAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Exercise marked as completed",
      updatedProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while marking exercise as completed",
      error: error.message,
    });
  }
};

export const getUserExerciseProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    const progress = await ExerciseProgress.find({ userId }).populate(
      "exerciseId"
    );

    if (!progress || progress.length === 0) {
      return res
        .status(404)
        .json({ message: "No exercise progress found for this user." });
    }

    res.status(200).json({
      message: "User exercise progress fetched successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching user exercise progress",
      error: error.message,
    });
  }
};
