import express from "express";
import {
  createChapter,
  getChaptersByCourse,
  updateChapter,
  deleteChapter,
} from "../controllers/chapter.controller.js";
import { isAdmin, verifyAccessToken } from "../middleware/auth.middleware.js";

const chapterRouter = express.Router();

chapterRouter.post(
  "/create-chapter",
  isAdmin,
  verifyAccessToken,
  createChapter
);
chapterRouter.get(
  "/get-chapters/:courseId",
  verifyAccessToken,
  getChaptersByCourse
);
chapterRouter.put(
  "/update-chapter/:id",
  isAdmin,
  verifyAccessToken,
  updateChapter
);
chapterRouter.delete(
  "/delete-chapter/:id",
  isAdmin,
  verifyAccessToken,
  deleteChapter
);

export default chapterRouter;
