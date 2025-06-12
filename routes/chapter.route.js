import express from "express";
import {
  createChapter,
  getChaptersByCourse,
  updateChapter,
  deleteChapter,
} from "../controllers/chapter.controller.js";
import { isAdmin, verifyAccessToken } from "../middleware/auth.middleware.js";

const chapterRouter = express.Router();

// All routes need authentication
chapterRouter.use(verifyAccessToken);

// Public (authenticated) route
chapterRouter.get("/:courseId", getChaptersByCourse);

// Admin-only routes
chapterRouter.use(isAdmin); // applies to routes below

chapterRouter.post("/", createChapter);
chapterRouter.put("/:id", updateChapter);
chapterRouter.delete("/:id", deleteChapter);

export default chapterRouter;
