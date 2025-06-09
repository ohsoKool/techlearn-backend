import Progress from "../models/progress.model.js";

export const updateProgress = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { userId, courseId, completed } = req.body;

  if (!userId || !courseId || !completed) {
    return res.status(400).json({
      message: "userId, courseId and completed (boolean) are required",
    });
  }

  try {
    const updatedProgress = await Progress.findOneAndUpdate(
      { userId, courseId },
      { completed },
      { new: true, runValidators: true, upsert: true }
    );

    res
      .status(200)
      .json({ message: "Progress updated", progress: updatedProgress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update progress", error: error.message });
  }
};

export const getProgressByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const progressList = await Progress.find({ userId });
    // .populate("courseId","title");

    if (!progressList.length) {
      return res
        .status(200)
        .json({ message: "No progress found for this user" });
    }

    res.status(200).json({ userId, progress: progressList });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch progress", error: error.message });
  }
};
