import CourseProgress from "../models/courseProgress.model.js";
import Chapter from "../models/chapter.model.js";

export const markChapterComplete = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const userId = req.user._id;

  try {
    // Check if chapter exists for the course
    const chapter = await Chapter.findOne({ _id: chapterId, courseId });
    if (!chapter) {
      return res
        .status(404)
        .json({ message: "Chapter not found in this course." });
    }

    // Find existing progress
    let progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      // Create new progress document
      progress = new CourseProgress({
        userId,
        courseId,
        completedChapters: [
          {
            chapterId,
            completedAt: new Date(),
            lastUpdated: new Date(),
          },
        ],
      });

      await progress.save();
      return res.status(201).json({
        message: "Progress created and chapter marked as complete",
        progress,
      });
    }

    // Remove existing entry for chapterId if it exists
    progress.completedChapters = progress.completedChapters.filter(
      (c) => c.chapterId.toString() !== chapterId
    );

    // Push the updated completion entry
    progress.completedChapters.push({
      chapterId,
      completedAt: new Date(),
      lastUpdated: new Date(),
    });

    await progress.save();

    res.status(200).json({ message: "Chapter marked as complete", progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourseProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  try {
    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ message: "No progress yet." });
    }
    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
