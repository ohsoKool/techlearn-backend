import express from "express";
import {
  register,
  login,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh-token", refreshAccessToken);

export default authRouter;
