import express from "express";
import {
  createExercise,
  getAllExercises,
  updateExercise,
  getExerciseById,
  deleteExercise,
} from "../controllers/exercise.controller.js";
import { verifyAccessToken, isAdmin } from "../middleware/auth.middleware.js";

const exerciseRouter = express.Router();

exerciseRouter.use(verifyAccessToken);

// GET /api/exercises - Get all exercises (User or Admin)
exerciseRouter.get("/", getAllExercises);

// GET /api/exercises/:exerciseId - Get a specific exercise by ID (User or Admin)
exerciseRouter.get("/:exerciseId", getExerciseById);

exerciseRouter.use(isAdmin);

// POST /api/exercises - Create a new exercise (Admin only)
exerciseRouter.post("/", createExercise);

// PUT /api/exercises/:exerciseId - Update an exercise (Admin only)
exerciseRouter.put("/:exerciseId", updateExercise);

// DELETE /api/exercises/:exerciseId - Delete an exercise (Admin only)
exerciseRouter.delete("/:exerciseId", deleteExercise);

export default exerciseRouter;
