import dotenv from "dotenv";
dotenv.config();
import { getConnection } from "../../UserRepository/MySQLClient.js";
import {
  calculatePackageCategory,
  calculatePrice,
  selectCarrier,
} from "../../../domain/utils/shipmentUtils.js";

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
    category ENUM('trabajador', 'administrador'),  -- Cambia a ENUM para definir categorías
    address VARCHAR(255),
    gender VARCHAR(10),
    email VARCHAR(90) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  const usersToInsert = [
    {
      username: "user1",
      category: "trabajador",
      email: "user1@example.com",
      password: "password1",
    },
    {
      username: "user2",
      category: "trabajador",
      email: "user2@example.com",
      password: "password2",
    },
    {
      username: "user3",
      category: "trabajador",
      email: "user3@example.com",
      password: "password3",
    },
    {
      username: "admin1",
      category: "administrador",
      email: "admin1@example.com",
      password: "adminpassword1",
    },
    {
      username: "admin2",
      category: "administrador",
      email: "admin2@example.com",
      password: "adminpassword2",
    },
    {
      username: "admin3",
      category: "administrador",
      email: "admin3@example.com",
      password: "adminpassword3",
    },
  ];

  for (const user of usersToInsert) {
    await connection.query(`INSERT INTO users SET ?`, user);
  }

  console.log(
    "Table users created and populated with 3 workers and 3 administrators."
  );
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
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // Inserta envíos con categorías, precios y compañía de envío calculados
  const shipmentsToInsert = [
    {
      destination_address: "Dirección de destino 1",
      postal_code: "12345",
      recipient_name: "Destinatario 1",
      sender_name: "Remitente 1",
      weight_kg: 0.05,
    },
    {
      destination_address: "Dirección de destino 2",
      postal_code: "15678",
      recipient_name: "Destinatario 2",
      sender_name: "Remitente 2",
      weight_kg: 0.2,
    },
    {
      destination_address: "Dirección de destino 3",
      postal_code: "20333",
      recipient_name: "Destinatario 3",
      sender_name: "Remitente 3",
      weight_kg: 4.0,
    },
    {
      destination_address: "Dirección de destino 4",
      postal_code: "25543",
      recipient_name: "Destinatario 4",
      sender_name: "Remitente 4",
      weight_kg: 8.0,
    },
    {
      destination_address: "Dirección de destino 5",
      postal_code: "98765",
      recipient_name: "Destinatario 5",
      sender_name: "Remitente 5",
      weight_kg: 15.0,
    },
  ];

  for (const shipment of shipmentsToInsert) {
    shipment.package_category = calculatePackageCategory(shipment.weight_kg);
    shipment.price = calculatePrice(
      shipment.weight_kg,
      shipment.package_category
    );

    shipment.shipping_company = selectCarrier(shipment.postal_code);

    await connection.query(`INSERT INTO shipments SET ?`, shipment);
  }

  console.log(
    "Table shipments created and populated with shipments with calculated categories, prices, and shipping companies."
  );
}

main();
