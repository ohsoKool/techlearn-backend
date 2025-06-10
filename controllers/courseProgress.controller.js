import CourseProgress from "../models/courseProgress.model.js";
import Course from "../models/course.model.js";

export const getCourseProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  try {
    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) return res.status(404).json({ message: "No progress yet." });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markChapterComplete = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const userId = req.user._id;
  try {
    const course = await Course.findById(courseId);
    const chapterExists = course?.chapters?.some(
      (ch) => ch._id.toString() === chapterId
    );
    if (!chapterExists)
      return res.status(404).json({ message: "Chapter not found in course." });

    const update = {
      $pull: { completedChapters: { chapterId } },
    };

    const insert = {
      chapterId,
      completedAt: new Date(),
      lastUpdated: new Date(),
    };

    const progress = await CourseProgress.findOneAndUpdate(
      { userId, courseId },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    progress.completedChapters.push(insert);
    await progress.save();

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
