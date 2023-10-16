import express from "express";
import {
  createShipmentController,
  listShipmentsController,
  getShipmentByIdController,
  deleteShipmentByIdController,
} from "../Controllers/Shipments.js";
import { authUser } from "../Middlewares/auth.js";

const shipmentsRoutes = express.Router();

shipmentsRoutes.post("/shipments", authUser, createShipmentController);
shipmentsRoutes.delete(
  "/shipments/:id",
  authUser,
  deleteShipmentByIdController
);
shipmentsRoutes.get("/shipments/:id", authUser, getShipmentByIdController);
shipmentsRoutes.get("/shipments", authUser, listShipmentsController);

export { shipmentsRoutes };
