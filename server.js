import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.route.js";
import { seedCourses } from "./utils/seed.js";
import noteRouter from "./routes/notes.route.js";
import courseProgressRouter from "./routes/courseProgress.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("MongoDB connected");

    await seedCourses();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
})();

app.use("/api/auth", authRouter);
app.use("/api/courses", [courseRouter, noteRouter]);
app.use("/api/courseProgress", courseProgressRouter);
app.get("/ping", (req, res) => res.send("Server is alive"));
