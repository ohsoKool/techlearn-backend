// seedCourses.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/course.model.js";

dotenv.config();

const courses = [
  { title: "Introduction to JavaScript" },
  { title: "Mastering React.js" },
  { title: "Node.js for Backend Development" },
  { title: "Understanding Databases: MongoDB & SQL" },
  { title: "REST API Design Principles" },
  { title: "Authentication & Authorization in Web Apps" },
  { title: "Frontend Styling with Tailwind CSS" },
  { title: "React Hooks Deep Dive" },
  { title: "Express.js Crash Course" },
  { title: "JWT Token Authentication System" },
];

export const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingCourses = await Course.find({});
    if (existingCourses.length === 0) {
      await Course.insertMany(courses);
      console.log("Courses seeded successfully");
    } else {
      console.log("Courses already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding courses:", error.message);
    process.exit(1);
  }
};
