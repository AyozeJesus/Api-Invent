import { Shipment } from "./Shipment";
import {
  calculatePackageCategory,
  calculatePrice,
  selectCarrier,
} from "../utils/shipmentUtils";
import { describe, expect, it } from "vitest";
describe("Shipment", () => {
  it("should create a shipment with calculated package category and price for ultra light package", () => {
    const weightKg = 0.05; // Paquete ultra ligero
    const shipment = new Shipment(
      1,
      "123 Main St",
      "12345",
      "John Doe",
      "Jane Smith",
      weightKg,
      "Shipping Co",
      calculatePackageCategory(weightKg),
      calculatePrice(weightKg, calculatePackageCategory(weightKg))
    );
    expect(shipment).toBeDefined();
    expect(shipment.getPackageCategory()).toBe("Paquete ultra ligero");
    expect(shipment.getPrice()).toBe(0.05 * 5);
  });

  it("should create a shipment with calculated package category and price for light package", () => {
    const weightKg = 0.2; // Paquete ligero
    const shipment = new Shipment(
      2,
      "456 Elm St",
      "23456",
      "Alice Johnson",
      "Bob Brown",
      weightKg,
      "Shipping Co",
      calculatePackageCategory(weightKg),
      calculatePrice(weightKg, calculatePackageCategory(weightKg))
    );
    expect(shipment).toBeDefined();
    expect(shipment.getPackageCategory()).toBe("Paquete ligero");
    expect(shipment.getPrice()).toBe(weightKg * 5 + 1);
  });

  it("should create a shipment with calculated package category and price for Standard package", () => {
    const weightKg = 3; // Paquete estándar
    const shipment = new Shipment(
      3,
      "789 Oak St",
      "34567",
      "Eve Wilson",
      "Charlie Davis",
      weightKg,
      "Shipping Co",
      calculatePackageCategory(weightKg),
      calculatePrice(weightKg, calculatePackageCategory(weightKg))
    );
    expect(shipment).toBeDefined();
    expect(shipment.getPackageCategory()).toBe("Paquete estándar");
    expect(shipment.getPrice()).toBe(weightKg * 10);
  });

  it("should create a shipment with calculated package category and price for heavy package", () => {
    const weightKg = 8; // Paquete pesado
    const shipment = new Shipment(
      4,
      "101 Pine St",
      "45678",
      "Grace Lee",
      "David Wilson",
      weightKg,
      "Shipping Co",
      calculatePackageCategory(weightKg),
      calculatePrice(weightKg, calculatePackageCategory(weightKg))
    );
    expect(shipment).toBeDefined();
    expect(shipment.getPackageCategory()).toBe("Paquete pesado");
    expect(shipment.getPrice()).toBe(weightKg * 5 + weightKg + 75);
  });

  it("should create a shipment with calculated package category and price for large volume package", () => {
    const weightKg = 15; // Gran volumen
    const shipment = new Shipment(
      5,
      "202 Cedar St",
      "56789",
      "Oliver White",
      "Emma Turner",
      weightKg,
      "Shipping Co",
      calculatePackageCategory(weightKg),
      calculatePrice(weightKg, calculatePackageCategory(weightKg))
    );
    expect(shipment).toBeDefined();
    expect(shipment.getPackageCategory()).toBe("Gran volumen");
    expect(shipment.getPrice()).toBe((weightKg - 10) * 7.5 + 130 + weightKg);
  });
});

it("should select a carrier based on postal code", () => {
  const postalCode1 = "17000"; // Correos
  const postalCode2 = "22500"; // Seur
  const postalCode3 = "26000"; // INVENT

  expect(selectCarrier(postalCode1)).toBe("Correos");
  expect(selectCarrier(postalCode2)).toBe("Seur");
  expect(selectCarrier(postalCode3)).toBe("INVENT");
});

it("should create a shipment and check attributes", () => {
  const shipment = new Shipment(
    1,
    "123 Main St",
    "12345",
    "John Doe",
    "Jane Smith",
    5,
    "Shipping Co",
    "Paquete estándar",
    50
  );
  expect(shipment).toBeDefined();
  expect(shipment.getId()).toBe(1);
  expect(shipment.getDestinationAddress()).toBe("123 Main St");
  expect(shipment.getPostalCode()).toBe("12345");
  expect(shipment.getRecipientName()).toBe("John Doe");
  expect(shipment.getSenderName()).toBe("Jane Smith");
  expect(shipment.getWeightKg()).toBe(5);
  expect(shipment.getShippingCompany()).toBe("Shipping Co");
  expect(shipment.getPackageCategory()).toBe("Paquete estándar");
  expect(shipment.getPrice()).toBe(50);
});

it("should check if shipment has specific attributes", () => {
  const shipment = new Shipment(
    1,
    "123 Main St",
    "12345",
    "John Doe",
    "Jane Smith",
    5,
    "Shipping Co",
    "Paquete estándar",
    50
  );
  expect(shipment.hasId(1)).toBeTruthy();
  expect(shipment.hasDestinationAddress("123 Main St")).toBeTruthy();
  expect(shipment.hasPostalCode("12345")).toBeTruthy();
  expect(shipment.hasRecipientName("John Doe")).toBeTruthy();
  expect(shipment.hasSenderName("Jane Smith")).toBeTruthy();
  expect(shipment.hasWeightKg(5)).toBeTruthy();
  expect(shipment.hasShippingCompany("Shipping Co")).toBeTruthy();
  expect(shipment.hasPackageCategory("Paquete estándar")).toBeTruthy();
  expect(shipment.hasPrice(50)).toBeTruthy();
});

it("should update shipment attributes", () => {
  const shipment = new Shipment(
    1,
    "123 Main St",
    "12345",
    "John Doe",
    "Jane Smith",
    5,
    "Shipping Co",
    "Paquete estándar",
    50
  );
  shipment.setDestinationAddress("456 Elm St");
  shipment.setPostalCode("54321");
  shipment.setRecipientName("Alice Johnson");
  shipment.setSenderName("Bob Brown");
  shipment.setWeightKg(10);
  shipment.setShippingCompany("New Shipping Co");
  shipment.setPackageCategory("Paquete pesado");
  shipment.setPrice(100);

  expect(shipment.getDestinationAddress()).toBe("456 Elm St");
  expect(shipment.getPostalCode()).toBe("54321");
  expect(shipment.getRecipientName()).toBe("Alice Johnson");
  expect(shipment.getSenderName()).toBe("Bob Brown");
  expect(shipment.getWeightKg()).toBe(10);
  expect(shipment.getShippingCompany()).toBe("New Shipping Co");
  expect(shipment.getPackageCategory()).toBe("Paquete pesado");
  expect(shipment.getPrice()).toBe(100);
});
