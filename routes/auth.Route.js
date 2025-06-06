import express from "express";
import Router from "router";
import { register, login } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
