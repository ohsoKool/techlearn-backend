import Chapter from "../models/chapter.model.js";

export const createChapter = async (req, res) => {
  try {
    const { courseId, title } = req.body;
    if (!courseId || !title) {
      return res
        .status(400)
        .json({ message: "Course ID and title are required" });
    }

    const newChapter = await Chapter.create({ courseId, title });
    res.status(201).json({ message: "Chapter created", chapter: newChapter });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create chapter", error: error.message });
  }
};

export const getChaptersByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const chapters = await Chapter.find({ courseId });
    res.status(200).json({ count: chapters.length, chapters });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch chapters", error: error.message });
  }
};

export const updateChapter = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedChapter = await Chapter.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.json({ message: "Chapter updated", chapter: updatedChapter });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update chapter", error: error.message });
  }
};

export const deleteChapter = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Chapter.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Chapter not found" });

    res.json({ message: "Chapter deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete chapter", error: error.message });
  }
};
