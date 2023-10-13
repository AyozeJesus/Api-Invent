const express = require("express");
const router = express.Router();
const {
  newUserController,
  loginController,
  getUserController,
} = require("../controllers/users");
const { authUser } = require("../middlewares/auth");

// Registrar un nuevo usuario
router.post("/user/register", newUserController);

// Iniciar sesión
router.post("/user/login", loginController);

// Obtener usuario por ID
router.get("/user/:id", authUser, getUserController);

module.exports = router;
