import Course from "../models/course.model.js";
import Chapter from "../models/chapter.model.js";
import Note from "../models/note.model.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ count: courses.length, courses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch courses", error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newCourse = await Course.create({ title });
    res.status(201).json({ message: "Course created", course: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course updated", course: updatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update course", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete related chapters
    await Chapter.deleteMany({ courseId: id });

    // Delete related notes
    await Note.deleteMany({ courseId: id });

    res.json({ message: "Course, chapters, and notes deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};
