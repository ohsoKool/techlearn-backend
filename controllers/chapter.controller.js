import Chapter from "../models/chapter.model.js";
import mongoose from "mongoose";

export const createChapter = async (req, res) => {
  try {
    const { courseId, title } = req.body;

    // Validate required fields
    if (!courseId || !title) {
      return res
        .status(400)
        .json({ message: "Course ID and title are required" });
    }

    // Validate courseId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
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

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid courseId" });
  }

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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid chapter ID" });
  }

  try {
    const updatedChapter = await Chapter.findByIdAndUpdate(id, req.body, {
      new: true, // Return updated doc
      runValidators: true, // Apply schema validations
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid chapter ID" });
  }

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
