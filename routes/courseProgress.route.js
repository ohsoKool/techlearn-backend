import express from "express";
import {
  getCourseProgress,
  markChapterComplete,
} from "../controllers/courseProgress.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const courseProgressRouter = express.Router();

courseProgressRouter.get("/:courseId", verifyAccessToken, getCourseProgress);
courseProgressRouter.post(
  "/:courseId/chapters/:chapterId/complete",
  verifyAccessToken,
  markChapterComplete
);

export default courseProgressRouter;
