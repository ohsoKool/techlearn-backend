import {
  getNoteByCourse,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controller.js";
import { verifyAccessToken, isAdmin } from "../middleware/auth.middleware.js";
import express from "express";
const noteRouter = express.Router();

noteRouter.get("/:courseId/notes", verifyAccessToken, getNoteByCourse);
noteRouter.post(
  "/:courseId/create-note/",
  verifyAccessToken,
  isAdmin,
  createNote
);
noteRouter.put("/:noteId/update-note/", verifyAccessToken, isAdmin, updateNote);
noteRouter.delete(
  "/:noteId/delete-note/",
  verifyAccessToken,
  isAdmin,
  deleteNote
);

export default noteRouter;
