const express = require("express")
const router = express.Router()
const {
  createShipmentController,
  listShipmentsController,
  getShipmentByIdController,
  deleteShipmentByIdController,
} = require("../Controllers/Shipments")
const { authUser } = require("../Middlewares/auth")

router.post("/shipments", createShipmentController)

router.delete("/shipments/:id", authUser, deleteShipmentByIdController)

router.get("/shipments/:id", getShipmentByIdController)

router.get("/shipments", listShipmentsController)

module.exports = router
