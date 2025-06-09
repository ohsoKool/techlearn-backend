import express from "express";
import {
  updateProgress,
  getProgressByUser,
} from "../controllers/progress.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const progressRouter = express.Router();

progressRouter.post("/update-progress/", verifyAccessToken, updateProgress);
progressRouter.get(
  "/getProgress/:userId",
  verifyAccessToken,
  getProgressByUser
);

export default progressRouter;
