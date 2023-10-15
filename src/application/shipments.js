import { getConnection } from "../infrastructure/UserRepository/MySQLClient.js";
import { generateError } from "./helpers.js";
import {
  calculatePackageCategory,
  calculatePrice,
  selectCarrier,
} from "../domain/utils/shipmentUtils.js";

export const createShipment = async ({
  destination_address,
  postal_code,
  recipient_name,
  sender_name,
  weight_kg,
  // eslint-disable-next-line no-unused-vars
  shipping_company,
}) => {
  let connection;
  try {
    connection = await getConnection();
    const package_category = calculatePackageCategory(weight_kg);

    let shipping_company;

    const postalCodeNumber = parseInt(postal_code);

    if (postalCodeNumber >= 15000 && postalCodeNumber <= 19999) {
      shipping_company = "Correos";
    } else if (postalCodeNumber >= 20000 && postalCodeNumber <= 25000) {
      shipping_company = "Seur";
    } else {
      shipping_company = "INVENT";
    }

    let price;
    switch (package_category) {
      case "Paquete ultra ligero":
        price = weight_kg * 5;
        break;
      case "Paquete ligero":
        price = weight_kg * 5 + 1;
        break;
      case "Paquete estándar":
        price = weight_kg * 10;
        break;
      case "Paquete pesado":
        price = weight_kg * 5 + weight_kg + 75;
        break;
      case "Gran volumen":
        price = (weight_kg - 10) * 7.5 + 130 + weight_kg;
        break;
      default:
        price = 0;
    }

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
