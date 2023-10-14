import { getConnection } from "../infrastructure/UserRepository/db.js";
import { generateError } from "../infrastructure/API/helpers.js";

export const calculatePackageCategory = (weight_kg) => {
  if (weight_kg <= 0.1) {
    return "Paquete ultra ligero";
  } else if (weight_kg <= 0.3) {
    return "Paquete ligero";
  } else if (weight_kg <= 5) {
    return "Paquete estándar";
  } else if (weight_kg <= 10) {
    return "Paquete pesado";
  } else {
    return "Gran volumen";
  }
};

export const calculatePrice = (weight_kg, package_category) => {
  switch (package_category) {
    case "Paquete ultra ligero":
      return weight_kg * 5;
    case "Paquete ligero":
      return weight_kg * 5 + 1;
    case "Paquete estándar":
      return weight_kg * 10;
    case "Paquete pesado":
      return weight_kg * 5 + weight_kg + 75;
    case "Gran volumen":
      return (weight_kg - 10) * 7.5 + 130 + weight_kg;
    default:
      return 0;
  }
};

export const selectCarrier = (postal_code) => {
  const postalCodeNumber = parseInt(postal_code);

  if (postalCodeNumber >= 15000 && postalCodeNumber <= 19999) {
    return "Correos";
  } else if (postalCodeNumber >= 20000 && postalCodeNumber <= 25000) {
    return "Seur";
  } else {
    return "INVENT";
  }
};

export const createShipment = async ({
  destination_address,
  postal_code,
  recipient_name,
  sender_name,
  weight_kg,
  shipping_company,
}) => {
  let connection;
  try {
    connection = await getConnection();
    const package_category = calculatePackageCategory(weight_kg);
    shipping_company = selectCarrier(postal_code);
    const price = calculatePrice(weight_kg, package_category);

    const insertUserQuery = `INSERT INTO shipments (destination_address, postal_code, recipient_name, sender_name, weight_kg, shipping_company, package_category, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [insertResult] = await connection.query(insertUserQuery, [
      destination_address,
      postal_code,
      recipient_name,
      sender_name,
      weight_kg,
      shipping_company,
      package_category,
      price,
    ]);

    return insertResult.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const listShipments = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [shipments] = await connection.query("SELECT * FROM shipments");
    return shipments;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deleteShipmentById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM shipments WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};
export const getShipmentById = async (id) => {
  if (!id) {
    throw generateError("No se proporcionó un ID.", 400);
  }
  let connection;
  try {
    connection = await getConnection();

    const [shipment] = await connection.query(
      `
      SELECT * FROM shipments WHERE id = ?
    `,
      [id]
    );

    if (shipment.length === 0) {
      throw generateError(`the shipment with ID: ${id} not found`, 404);
    }

    return [shipment[0]];
  } finally {
    if (connection) connection.release();
  }
};
