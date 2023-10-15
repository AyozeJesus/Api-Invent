/* eslint-disable no-unused-vars */
import {
  createShipment,
  listShipments,
  getShipmentById,
  deleteShipmentById,
} from "../../../application/shipments.js";
import { generateError } from "../../../application/helpers.js";

import {
  newShipmentSchema,
  getShipmentSchema,
} from "../schemas/shipmentSchema.js";

export const validateNewShipmenty = (req, res, next) => {
  const { error } = newShipmentSchema.validate(req.body);

  if (error) {
    throw generateError(error.details[0].message, 400);
  }
  next();
};
export const createShipmentController = async (req, res, next) => {
  try {
    const {
      destination_address,
      postal_code,
      recipient_name,
      sender_name,
      weight_kg,
    } = req.body;

    const shipmentId = await createShipment({
      destination_address,
      postal_code,
      recipient_name,
      sender_name,
      weight_kg,
    });

    res
      .status(201)
      .json({ message: "Shipment created successfully.", shipmentId });
  } catch (error) {
    next(error);
  }
};

export const listShipmentsController = async (req, res, next) => {
  try {
    const shipments = await listShipments();
    res.status(200).json(shipments);
  } catch (error) {
    next(error);
  }
};

export const getShipmentByIdController = async (req, res, next) => {
  try {
    const { error, value } = getShipmentSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { id } = req.params;
    const shipment = await getShipmentById(id);

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
    const shipment = await getShipmentById(id);

    if (!shipment) {
      return res
        .status(404)
        .json({ message: "The shipment with this ID does not exist." });
    }

    await deleteShipmentById(id);
    res.status(200).json({ message: "Shipment deleted successfully." });
  } catch (error) {
    next(error);
  }
};
