import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/course.model.js";
import Chapter from "../models/chapter.model.js";

dotenv.config();

const courses = [
  {
    title: "Introduction to JavaScript",
    chapters: [
      "Variables & Data Types",
      "Functions & Scope",
      "Loops & Conditionals",
    ],
  },
  {
    title: "Mastering React.js",
    chapters: ["JSX & Components", "State & Props", "React Router"],
  },
  {
    title: "Node.js for Backend Development",
    chapters: [
      "Node.js Fundamentals",
      "File System & Streams",
      "Event Loop & Async",
    ],
  },
  {
    title: "Understanding Databases: MongoDB & SQL",
    chapters: [
      "MongoDB Basics",
      "Relational vs NoSQL",
      "Querying with Mongoose",
    ],
  },
  {
    title: "REST API Design Principles",
    chapters: [
      "HTTP Methods & Status Codes",
      "RESTful Routing",
      "Versioning & Error Handling",
    ],
  },
  {
    title: "Authentication & Authorization in Web Apps",
    chapters: [
      "Sessions vs JWT",
      "Login & Signup Flow",
      "Role-Based Access Control",
    ],
  },
  {
    title: "Frontend Styling with Tailwind CSS",
    chapters: [
      "Utility-first Design",
      "Responsive Layouts",
      "Customizing Themes",
    ],
  },
  {
    title: "React Hooks Deep Dive",
    chapters: [
      "useState & useEffect",
      "useContext & useReducer",
      "Creating Custom Hooks",
    ],
  },
  {
    title: "Express.js Crash Course",
    chapters: ["Routing & Middleware", "Request Lifecycle", "Error Handling"],
  },
  {
    title: "JWT Token Authentication System",
    chapters: [
      "Token Creation & Storage",
      "Protecting Routes",
      "Token Expiry & Refresh",
    ],
  },
];

export const seedCourses = async () => {
  try {
    const existingCourses = await Course.find({});
    if (existingCourses.length > 0) {
      console.log("Courses already exist, skipping seeding.");
      return;
    }

    for (const courseData of courses) {
      const course = await Course.create({ title: courseData.title });

      const chapterDocs = courseData.chapters.map((title) => ({
        title,
        courseId: course._id,
      }));

      await Chapter.insertMany(chapterDocs);
    }

    console.log("Courses and chapters seeded successfully");
  } catch (error) {
    console.error("Error seeding courses:", error.message);
    process.exit(1);
  }
};
