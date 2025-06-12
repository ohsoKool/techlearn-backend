import express from "express";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { verifyAccessToken, isAdmin } from "../middleware/auth.middleware.js";

const courseRouter = express.Router();

courseRouter.use(verifyAccessToken);

// GET /api/courses — accessible by all authenticated users
courseRouter.get("/", getAllCourses);

// Apply admin check only for the routes below
courseRouter.use(isAdmin);

// POST /api/courses — only admin can create a new course
courseRouter.post("/", createCourse);

// PUT /api/courses/:id — only admin can update an existing course
courseRouter.put("/:id", updateCourse);

// DELETE /api/courses/:id — only admin can delete a course and related content
courseRouter.delete("/:id", deleteCourse);

export default courseRouter;
