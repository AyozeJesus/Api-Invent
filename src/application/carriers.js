import { getConnection } from "../infrastructure/Database/MySQLClient.js";
import { generateError } from "./helpers.js";
export const createCarrier = async (name) => {
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
};

export const listCarriers = async () => {
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
};

export const getCarrierById = async (id) => {
  if (!id) {
    throw generateError("No se proporcionó un ID.", 400);
  }
  let connection;
  try {
    connection = await getConnection();

    const [carrier] = await connection.query(
      `SELECT * FROM carriers WHERE id = ?`,
      [id]
    );

    if (carrier.length === 0) {
      throw generateError(`Carrier with ID: ${id} not found`, 404);
    }

    return carrier[0];
  } finally {
    if (connection) connection.release();
  }
};

export const updateCarrierName = async (id, name) => {
  if (!id) {
    throw generateError("No se proporcionó un ID.", 400);
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
};

export const deleteCarrierById = async (id) => {
  if (!id) {
    throw generateError("No se proporcionó un ID.", 400);
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
};
