import {
  markExerciseAsCompleted,
  getUserExerciseProgress,
} from "../controllers/exerciseProgress.controller.js";
import express from "express";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
const exerciseProgressRouter = express.Router();
exerciseProgressRouter.post(
  "/:exerciseId/complete",
  verifyAccessToken,
  markExerciseAsCompleted
);
exerciseProgressRouter.get(
  "/user-progress",
  verifyAccessToken,
  getUserExerciseProgress
);

export default exerciseProgressRouter;
