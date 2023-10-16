import express from "express";
import {
  validateNewCarrier,
  createCarrierController,
  listCarriersController,
  getCarrierByIdController,
  updateCarrierController,
  deleteCarrierByIdController,
} from "../Controllers/Carriers.js";
import { authUser } from "../Middlewares/auth.js";

const carriersRoutes = express.Router();

// Ruta para crear un nuevo "carrier"
carriersRoutes.post(
  "/carrier",
  authUser,
  validateNewCarrier,
  createCarrierController
);

// Ruta para listar todos los "carriers"
carriersRoutes.get("/carriers", authUser, listCarriersController);

// Ruta para obtener un "carrier" por su ID
carriersRoutes.get("/carrier/:id", authUser, getCarrierByIdController);

// Ruta para actualizar un "carrier" por su ID
carriersRoutes.put("/carrier/:id", authUser, updateCarrierController);

// Ruta para eliminar un "carrier" por su ID
carriersRoutes.delete("/carrier/:id", authUser, deleteCarrierByIdController);

export default carriersRoutes;
