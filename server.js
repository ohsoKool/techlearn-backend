// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.Route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
})();

app.use("/api/auth", authRouter);

app.get("/ping", (req, res) => res.send("Server is alive"));
