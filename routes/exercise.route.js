import {
  createExercise,
  getAllExercises,
  updateExercise,
  getExerciseById,
  deleteExercise,
} from "../controllers/exercise.controller.js";
import express from "express";
import { isAdmin, verifyAccessToken } from "../middleware/auth.middleware.js";

const exerciseRouter = express.Router();
exerciseRouter.post(
  "/create-exercise",
  verifyAccessToken,
  isAdmin,
  createExercise
);
exerciseRouter.get("/getAllExercises", verifyAccessToken, getAllExercises);
exerciseRouter.put(
  "/update-exercise/:exerciseId",
  verifyAccessToken,
  isAdmin,
  updateExercise
);
exerciseRouter.get(
  "/fetch-exercise/:exerciseId",
  verifyAccessToken,
  getExerciseById
);
exerciseRouter.delete(
  "/delete-exercise/:exerciseId",
  verifyAccessToken,
  deleteExercise
);

export default exerciseRouter;
