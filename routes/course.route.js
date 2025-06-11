import express from "express";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { verifyAccessToken, isAdmin } from "../middleware/auth.middleware.js";

const courseRouter = express.Router();

courseRouter.get("/getAllCourses", verifyAccessToken, getAllCourses);
courseRouter.post("/create-course", verifyAccessToken, isAdmin, createCourse);
courseRouter.put(
  "/update-course/:id",
  verifyAccessToken,
  isAdmin,
  updateCourse
);
courseRouter.delete(
  "/delete-course/:id",
  verifyAccessToken,
  isAdmin,
  deleteCourse
);

export default courseRouter;
