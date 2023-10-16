import express from "express";
import {
  newUserController,
  loginController,
  getUserController,
  getUsersByCategoryController,
} from "../Controllers/Users.js";
import { authUser } from "../Middlewares/auth.js";

const userRoutes = express.Router();

// Registrar un nuevo usuario
userRoutes.post("/user/register", newUserController);

// Iniciar sesión
userRoutes.post("/user/login", loginController);

// Obtener usuario por ID
userRoutes.get("/user/:id", authUser, authUser, getUserController);

// Ruta para obtener usuarios por categoría
userRoutes.get(
  "/users/category/:category",
  authUser,
  getUsersByCategoryController
);

export { userRoutes };
