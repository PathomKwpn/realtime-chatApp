import { Route } from "express";
import { signup } from "../controllers/AuthController.js";

const authRoutes = Route();

authRoutes.post("/signup", signup);

export default authRoutes;
