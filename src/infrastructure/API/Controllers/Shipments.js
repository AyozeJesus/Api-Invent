import ShipmentService from "../../../domain/services/ShipmentService.js";
import { generateError } from "../../../domain/utils/helpers.js";

import {
  newShipmentSchema,
  getShipmentSchema,
} from "../Schemas/shipmentSchema.js";

const shipmentService = new ShipmentService();

export const validateNewShipment = (req, res, next) => {
  const { error } = newShipmentSchema.validate(req.body);

  if (error) {
    throw generateError(error.details[0].message, 400);
  }
  next();
};

export const createShipmentController = async (req, res, next) => {
  try {
    const shipmentId = await shipmentService.createShipment(req.body);
    res
      .status(200)
      .json({ message: "Shipment created successfully", shipmentId });
  } catch (error) {
    next(error);
  }
};

export const listShipmentsController = async (req, res, next) => {
  try {
    const shipments = await shipmentService.listShipments();
    res.status(200).json(shipments);
  } catch (error) {
    next(error);
  }
};

export const getShipmentByIdController = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { error, value } = getShipmentSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id } = req.params;
    const shipment = await shipmentService.getShipmentById(id);

    if (!shipment) {
      res.status(404).json({ message: "Shipment not found." });
    } else {
      res.status(200).json(shipment);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteShipmentByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shipment = await shipmentService.getShipmentById(id);

    if (!shipment) {
      return res
        .status(404)
        .json({ message: "The shipment with this ID does not exist." });
    }

    await shipmentService.deleteShipmentById(id);
    res.status(200).json({ message: "Shipment deleted successfully." });
  } catch (error) {
    next(error);
  }
};
