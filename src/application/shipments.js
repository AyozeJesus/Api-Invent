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
}) => {
  if (!/^\d{5}$/.test(postal_code)) {
    throw new Error(
      "Please enter a 5-digit postal code between 00001 and 99999."
    );
  }

  let connection;
  try {
    connection = await getConnection();

    const package_category = calculatePackageCategory(weight_kg);
    const shipping_company = selectCarrier(postal_code);
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

    return shipment[0];
  } finally {
    if (connection) connection.release();
  }
};
