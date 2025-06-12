import express from "express";
import {
  markExerciseAsCompleted,
  getUserExerciseProgress,
} from "../controllers/exerciseProgress.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const exerciseProgressRouter = express.Router();

// All routes below require authentication
exerciseProgressRouter.use(verifyAccessToken);

// GET /api/exercise-progress/user-progress - Get logged-in user's exercise progress
exerciseProgressRouter.get("/user-progress", getUserExerciseProgress);

// POST /api/exercise-progress/:exerciseId/complete - Mark an exercise as completed
exerciseProgressRouter.post("/:exerciseId/complete", markExerciseAsCompleted);

export default exerciseProgressRouter;
