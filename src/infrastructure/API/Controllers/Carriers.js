import {
  createCarrier,
  listCarriers,
  getCarrierById,
  updateCarrierName,
  deleteCarrierById,
} from "../../../application/carriers.js";

export const validateNewCarrier = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid carrier name." });
  }

  next();
};

export const createCarrierController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const carrierId = await createCarrier(name);
    res
      .status(201)
      .json({ message: "Carrier created successfully.", carrierId });
  } catch (error) {
    next(error);
  }
};

export const listCarriersController = async (req, res, next) => {
  try {
    const carriers = await listCarriers();
    res.status(200).json(carriers);
  } catch (error) {
    next(error);
  }
};

export const getCarrierByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carrier = await getCarrierById(id);

    if (!carrier) {
      res.status(404).json({ message: "Carrier not found." });
    } else {
      res.status(200).json(carrier);
    }
  } catch (error) {
    next(error);
  }
};

export const updateCarrierController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await updateCarrierName(id, name);
    res.status(200).json({ message: "Carrier name updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteCarrierByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carrier = await getCarrierById(id);

    if (!carrier) {
      res.status(404).json({ message: "Carrier not found." });
    } else {
      await deleteCarrierById(id);
      res.status(200).json({ message: "Carrier deleted successfully." });
    }
  } catch (error) {
    next(error);
  }
};
