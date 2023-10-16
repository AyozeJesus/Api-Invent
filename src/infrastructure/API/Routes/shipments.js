import express from "express";
import {
  createShipmentController,
  listShipmentsController,
  getShipmentByIdController,
  deleteShipmentByIdController,
} from "../Controllers/Shipments.js";
import { authUser } from "../Middlewares/auth.js";

const shipmentsRoutes = express.Router();

shipmentsRoutes.post("/shipments", createShipmentController);
shipmentsRoutes.delete("/shipments/:id", deleteShipmentByIdController);
shipmentsRoutes.get("/shipments/:id", getShipmentByIdController);
shipmentsRoutes.get("/shipments", listShipmentsController);

export { shipmentsRoutes };
