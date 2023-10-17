import { getConnection } from "../../infrastructure/Database/MySQLClient.js";

export class CarrierRepository {
  async createCarrier(name) {
    let connection;
    try {
      connection = await getConnection();

      const insertCarrierQuery = `INSERT INTO carriers (name) VALUES (?)`;
      const [insertResult] = await connection.query(insertCarrierQuery, [name]);

      return insertResult.insertId;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async listCarriers() {
    let connection;
    try {
      connection = await getConnection();
      const [carriers] = await connection.query("SELECT * FROM carriers");
      return carriers;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getCarrierById(id) {
    if (!id) {
      throw new Error("No se proporcionó un ID.");
    }
    let connection;
    try {
      connection = await getConnection();

      const [carrier] = await connection.query(
        `SELECT * FROM carriers WHERE id = ?`,
        [id]
      );

      if (carrier.length === 0) {
        throw new Error(`Carrier with ID: ${id} not found`);
      }

      return carrier[0];
    } finally {
      if (connection) connection.release();
    }
  }

  async updateCarrierName(id, name) {
    if (!id) {
      throw new Error("No se proporcionó un ID.");
    }
    let connection;
    try {
      connection = await getConnection();

      await connection.query(
        `
        UPDATE carriers SET name = ? WHERE id = ?
      `,
        [name, id]
      );

      return;
    } finally {
      if (connection) connection.release();
    }
  }

  async deleteCarrierById(id) {
    if (!id) {
      throw new Error("No se proporcionó un ID.");
    }
    let connection;
    try {
      connection = await getConnection();

      await connection.query(
        `
        DELETE FROM carriers WHERE id = ?
      `,
        [id]
      );

      return;
    } finally {
      if (connection) connection.release();
    }
  }
}
