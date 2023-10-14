import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createShipment,
  listShipments,
  getShipmentById,
  deleteShipmentById,
  calculatePackageCategory,
  calculatePrice,
  selectCarrier,
} from "./shipments";

const db = require("./db");

vi.mock("mysql2/promise", () => {
  return {
    createPool: () => {
      return {
        getConnection: async () => {
          return {
            release: vi.fn(),
          };
        },
      };
    },
  };
});

vi.mock("dotenv", () => {
  return {
    config: () => {
      process.env.DB_HOST = "testhost";
      process.env.DB_USER = "testuser";
      process.env.DB_PASSWORD = "testpassword";
      process.env.DB_DATABASE = "testdb";
    },
  };
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("createShipment", () => {
  it("should create a shipment", async () => {
    const shipment = await createShipment({
      destination_address: "Dirección de destino",
      postal_code: "38207",
      recipient_name: "Nombre del destinatario",
      sender_name: "Nombre del remitente",
      weight_kg: 3,
      shipping_company: "INVENT",
      package_category: "Paquete ultra ligero",
      price: 0.45,
    });
    expect(shipment).toBeDefined();
  });

  it("should throw an error if the shipment is incomplete", async () => {
    const incompleteShipment = {
      destination_address: "Dirección de destino",
      postal_code: "38207",
      recipient_name: "Nombre del destinatario",
      weight_kg: 3,
      shipping_company: "INVENT",
      package_category: "Paquete ultra ligero",
      price: 0.45,
    };

    const testFunction = async () => {
      try {
        await createShipment(incompleteShipment);
      } catch (error) {
        expect(error.message).toBe("Column 'sender_name' cannot be null");
        throw error;
      }
    };
    await expect(testFunction()).rejects.toThrowError(
      "Column 'sender_name' cannot be null"
    );
  });

  it("should calculate the package category", () => {
    const packageCategory = calculatePackageCategory(0.05);
    expect(packageCategory).toBe("Paquete ultra ligero");
    const packageCategory2 = calculatePackageCategory(0.3);
    expect(packageCategory2).toBe("Paquete ligero");
    const packageCategory3 = calculatePackageCategory(5);
    expect(packageCategory3).toBe("Paquete estándar");
    const packageCategory4 = calculatePackageCategory(10);
    expect(packageCategory4).toBe("Paquete pesado");
    const packageCategory5 = calculatePackageCategory(15);
    expect(packageCategory5).toBe("Gran volumen");
  });

  it("should calculate the price", () => {
    const price = calculatePrice(0.05, "Paquete ultra ligero");
    expect(price).toBe(0.25);
    const price2 = calculatePrice(0.3, "Paquete ligero");
    expect(price2).toBe(2.5);
    const price3 = calculatePrice(5, "Paquete estándar");
    expect(price3).toBe(50);
    const price4 = calculatePrice(10, "Paquete pesado");
    expect(price4).toBe(135);
    const price5 = calculatePrice(15, "Gran volumen");
    expect(price5).toBe(182.5);
  });

  it("should select the carrier", () => {
    const carrier = selectCarrier(38207);
    expect(carrier).toBe("INVENT");
    const carrier2 = selectCarrier(20000);
    expect(carrier2).toBe("Seur");
    const carrier3 = selectCarrier(15000);
    expect(carrier3).toBe("Correos");
  });
});

describe("listShipments", () => {
  it("should list shipments", async () => {
    const shipments = await listShipments();
    expect(shipments).toBeDefined();
  });

  it("should return an empty array if there are no shipments", async () => {
    const shipments = await listShipments();
    expect(shipments).toEqual([]);
  });

  it("should return an array of shipments", async () => {
    const shipments = await listShipments();
    expect(shipments).toEqual([
      {
        id: 1,
        destination_address: "Dirección de destino",
        postal_code: "38207",
        recipient_name: "Nombre del destinatario",
        sender_name: "Nombre del remitente",
        weight_kg: 3,
        shipping_company: "INVENT",
        package_category: "Paquete ultra ligero",
        price: 0.45,
      },
    ]);
  });
});
