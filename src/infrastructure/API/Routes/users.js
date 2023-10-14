import express from "express";
import {
  newUserController,
  loginController,
  getUserController,
} from "../Controllers/Users.js";
import { authUser } from "../Middlewares/auth.js";

const userRoutes = express.Router();

// Registrar un nuevo usuario
userRoutes.post("/user/register", newUserController);

// Iniciar sesión
userRoutes.post("/user/login", loginController);

// Obtener usuario por ID
userRoutes.get("/user/:id", authUser, getUserController);

export { userRoutes };
