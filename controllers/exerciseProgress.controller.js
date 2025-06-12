import ExerciseProgress from "../models/exerciseProgress.model.js";

// Mark a specific exercise as completed by the logged-in user
export const markExerciseAsCompleted = async (req, res) => {
  const { exerciseId } = req.params;
  const userId = req.user._id;

  if (!exerciseId) {
    return res.status(400).json({ message: "Exercise ID is required" });
  }

  try {
    // Update progress if exists, or create a new one if not (upsert = true)
    const updatedProgress = await ExerciseProgress.findOneAndUpdate(
      { userId, exerciseId }, // Query to find existing progress
      {
        status: "completed",
        submittedAt: new Date(), // Mark timestamp of completion
      },
      {
        upsert: true, // Create a new doc if none exists
        new: true, // Return the updated (or newly created) document
        setDefaultsOnInsert: true, // Ensure default values are applied on insert
      }
    );

    res.status(200).json({
      message: "Exercise marked as completed",
      progress: updatedProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark exercise as completed",
      error: error.message,
    });
  }
};

// Get all exercise progress for the logged-in user
export const getUserExerciseProgress = async (req, res) => {
  const userId = req.user._id;

  try {
    // Fetch all progress documents for the user and populate exercise details
    const progress = await ExerciseProgress.find({ userId }).populate(
      "exerciseId"
    );

    if (!progress.length) {
      return res.status(404).json({ message: "No exercise progress found" });
    }

    res.status(200).json({
      message: "User exercise progress fetched successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch exercise progress",
      error: error.message,
    });
  }
};
