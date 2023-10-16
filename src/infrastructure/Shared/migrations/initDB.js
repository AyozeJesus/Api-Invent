import dotenv from "dotenv";
dotenv.config();
import { getConnection } from "../../UserRepository/MySQLClient.js";

async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log("connected");
    console.log("Dropping existing tables");
    await dropTableIfExists(connection, "shipments");
    await dropTableIfExists(connection, "carriers");
    await dropTableIfExists(connection, "users");

    console.log("Creating tables");

    await createUsersTable(connection);
    await createCarriersTable(connection);
    await createShipmentsTable(connection);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

async function dropTableIfExists(connection, tableName) {
  await connection.query(`DROP TABLE IF EXISTS ${tableName}`);
  console.log(`Table ${tableName} dropped if exists.`);
}

async function createUsersTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50),
    last_name VARCHAR(50),
    category VARCHAR(15),
    address VARCHAR(255),
    gender VARCHAR(10),
    email VARCHAR(90) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  console.log("Table users created.");
}

async function createCarriersTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS carriers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )`);
  console.log("Table carriers created.");
  await connection.query(
    `INSERT INTO carriers (name) VALUES ('Correos'), ('Seur'), ('Invent')`
  );
  console.log("Carriers Correos, Seur e Invent inserted.");
}

async function createShipmentsTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS shipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination_address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    recipient_name VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    weight_kg DECIMAL(5, 2) NOT NULL,
    shipping_company VARCHAR(255) NOT NULL,
    package_category VARCHAR(50) NOT NULL, 
    price DECIMAL(10, 2) NOT NULL
  )`);
  console.log("Table shipments created.");
}

main();
