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
carriersRoutes.post("/carrier", validateNewCarrier, createCarrierController);

// Ruta para listar todos los "carriers"
carriersRoutes.get("/carriers", listCarriersController);

// Ruta para obtener un "carrier" por su ID
carriersRoutes.get("/carrier/:id", getCarrierByIdController);

// Ruta para actualizar un "carrier" por su ID
carriersRoutes.put("/carrier/:id", updateCarrierController);

// Ruta para eliminar un "carrier" por su ID
carriersRoutes.delete("/carrier/:id", deleteCarrierByIdController);

export default carriersRoutes;
