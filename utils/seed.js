import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/course.model.js";

dotenv.config();

const courses = [
  {
    title: "Introduction to JavaScript",
    chapters: [
      { title: "Variables & Data Types" },
      { title: "Functions & Scope" },
      { title: "Loops & Conditionals" },
    ],
  },
  {
    title: "Mastering React.js",
    chapters: [
      { title: "JSX & Components" },
      { title: "State & Props" },
      { title: "React Router" },
    ],
  },
  {
    title: "Node.js for Backend Development",
    chapters: [
      { title: "Node.js Fundamentals" },
      { title: "File System & Streams" },
      { title: "Event Loop" },
    ],
  },
  {
    title: "Understanding Databases: MongoDB & SQL",
    chapters: [
      { title: "MongoDB Basics" },
      { title: "Relational vs NoSQL" },
      { title: "Querying with Mongoose" },
    ],
  },
  {
    title: "REST API Design Principles",
    chapters: [{ title: "HTTP Methods" }, { title: "RESTful Routes" }],
  },
  {
    title: "Authentication & Authorization in Web Apps",
    chapters: [{ title: "Sessions vs JWT" }, { title: "Login Flow" }],
  },
  {
    title: "Frontend Styling with Tailwind CSS",
    chapters: [
      { title: "Utility-first Design" },
      { title: "Responsive Layouts" },
    ],
  },
  {
    title: "React Hooks Deep Dive",
    chapters: [{ title: "useState & useEffect" }, { title: "Custom Hooks" }],
  },
  {
    title: "Express.js Crash Course",
    chapters: [{ title: "Routing" }, { title: "Middleware" }],
  },
  {
    title: "JWT Token Authentication System",
    chapters: [{ title: "Token Generation" }, { title: "Securing Routes" }],
  },
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

    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding courses:", error.message);
    process.exit(1);
  }
};
