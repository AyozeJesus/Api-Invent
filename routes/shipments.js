const express = require("express");
const router = express.Router();
const {
  createShipmentController,
  listShipmentsController,
  getShipmentByIdController,
  deleteShipmentByIdController,
} = require("../controllers/shipments");
const { authUser } = require("../middlewares/auth");

router.post("/shipments", createShipmentController);

router.delete("/shipments/:id", authUser, deleteShipmentByIdController);

router.get("/shipments/:id", getShipmentByIdController);

router.get("/shipments", listShipmentsController);

module.exports = router;
