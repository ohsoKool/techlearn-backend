import express from "express";
import {
  getNoteByCourse,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controller.js";
import { verifyAccessToken, isAdmin } from "../middleware/auth.middleware.js";

const noteRouter = express.Router();

// All routes require authentication
noteRouter.use(verifyAccessToken);

// GET /api/notes/:courseId - Get notes for a course (User or Admin)
noteRouter.get("/:courseId", getNoteByCourse);

// Admin-only routes
noteRouter.use(isAdmin);

// POST /api/notes/:courseId - Create a new note for a course (Admin only)
noteRouter.post("/:courseId", createNote);

// PUT /api/notes/:noteId - Update a note (Admin only)
noteRouter.put("/:noteId", updateNote);

// DELETE /api/notes/:noteId - Delete a note (Admin only)
noteRouter.delete("/:noteId", deleteNote);

export default noteRouter;
