import Note from "../models/note.model.js";

export const getNoteByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const notes = await Note.find({ courseId });
    if (!notes || notes.length === 0) {
      return res
        .status(200)
        .json({ message: "No notes found for this course" });
    }
    res.status(200).json({ courseId, notes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch notes", error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { content } = req.body;

    if (!content || !courseId) {
      return res
        .status(400)
        .json({ message: "Content and courseId are required" });
    }

    const newNote = await Note.create({
      content,
      courseId,
    });

    res.status(201).json({ message: "Note created", note: newNote });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create note", error: error.message });
  }
};

export const updateNote = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res
      .status(400)
      .json({ message: "Content is required to update note" });
  }

  try {
    const { noteId } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated", note: updatedNote });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update note", error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: error.message });
  }
};
