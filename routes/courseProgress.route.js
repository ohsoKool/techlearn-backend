import express from "express";
import {
  getCourseProgress,
  markChapterComplete,
} from "../controllers/courseProgress.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const courseProgressRouter = express.Router();

// All routes below require authentication
courseProgressRouter.use(verifyAccessToken);

// GET /api/course-progress/:courseId - Get user's progress for a specific course
courseProgressRouter.get("/:courseId", getCourseProgress);

// POST /api/course-progress/:courseId/chapters/:chapterId/complete - Mark a chapter as complete
courseProgressRouter.post(
  "/:courseId/chapters/:chapterId/complete",
  markChapterComplete
);

export default courseProgressRouter;
