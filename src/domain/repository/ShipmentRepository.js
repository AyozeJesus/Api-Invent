import { getConnection } from "../../infrastructure/Database/MySQLClient.js";
export class ShipmentRepository {
  async createShipment(shipmentData) {
    let connection;
    try {
      connection = await getConnection();

      const insertQuery = `INSERT INTO shipments (destination_address, postal_code, recipient_name, sender_name, weight_kg, shipping_company, package_category, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const [insertResult] = await connection.query(insertQuery, [
        shipmentData.destination_address,
        shipmentData.postal_code,
        shipmentData.recipient_name,
        shipmentData.sender_name,
        shipmentData.weight_kg,
        shipmentData.shipping_company,
        shipmentData.package_category,
        shipmentData.price,
      ]);

      return insertResult.insertId;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async listShipments() {
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
  }

  async deleteShipmentById(id) {
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
  }

  async getShipmentById(id) {
    let connection;
    try {
      connection = await getConnection();

      const [shipment] = await connection.query(
        `
        SELECT * FROM shipments WHERE id = ?
      `,
        [id]
      );

      return shipment[0];
    } finally {
      if (connection) connection.release();
    }
  }
}
