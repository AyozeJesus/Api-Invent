import { ShipmentRepositoryMock } from "./ShipmentRepositoryMock";
import { describe, expect, it, beforeEach } from "vitest";
import {
  calculatePackageCategory,
  calculatePrice,
  selectCarrier,
} from "../../domain/utils/shipmentUtils";

describe("ShipmentRepositoryMock", () => {
  let shipmentRepositoryMock;

  beforeEach(() => {
    shipmentRepositoryMock = new ShipmentRepositoryMock();
  });

  describe("Create Shipment", () => {
    it("should create a shipment", async () => {
      const shipmentData = {
        destination_address: "123 Main St",
        postal_code: "12345",
        recipient_name: "Alice",
        sender_name: "Bob",
        weight_kg: 2.5,
      };

      const shipmentId =
        await shipmentRepositoryMock.createShipment(shipmentData);
      expect(shipmentId).toBe(1);
    });

    it("should throw an error when trying to create a shipment with an invalid postal code", async () => {
      const shipmentData = {
        destination_address: "123 Main St",
        postal_code: "1234",
        recipient_name: "Alice",
        sender_name: "Bob",
        weight_kg: 2.5,
      };
      await expect(
        shipmentRepositoryMock.createShipment(shipmentData)
      ).rejects.toThrow(
        "Please enter a 5-digit postal code between 00001 and 99999."
      );
    });

    it("should throw an error when trying to create a shipment with no postal code", async () => {
      const shipmentData = {
        destination_address: "123 Main St",
        postal_code: "",
        recipient_name: "Alice",
        sender_name: "Bob",
        weight_kg: 2.5,
      };
      await expect(
        shipmentRepositoryMock.createShipment(shipmentData)
      ).rejects.toThrow(
        "Please enter a 5-digit postal code between 00001 and 99999."
      );
    });

    it("Should throw an error when trying to create a shipment with insufficient data", async () => {
      const shipmentData = {
        destination_address: "123 Main St",
        postal_code: "12345",
        recipient_name: "Alice",
        sender_name: "Bob",
      };
      await expect(
        shipmentRepositoryMock.createShipment(shipmentData)
      ).rejects.toThrow("Please provide all required shipment information.");
    });
  });

  describe("List Shipments", () => {
    it("should list shipments", async () => {
      const shipments = await shipmentRepositoryMock.listShipments();
      expect(Array.isArray(shipments)).toBe(true);
    });
  });

  describe("Get Shipment by ID", () => {
    it("should get a shipment by ID", async () => {
      const shipmentData = {
        destination_address: "456 Elm St",
        postal_code: "54321",
        recipient_name: "Eve",
        sender_name: "Charlie",
        weight_kg: 3.0,
      };

      const shipmentId =
        await shipmentRepositoryMock.createShipment(shipmentData);

      const retrievedShipment =
        await shipmentRepositoryMock.getShipmentById(shipmentId);
      expect(retrievedShipment).toBeDefined();
      expect(retrievedShipment.id).toBe(shipmentId);
    });

    it("should throw an error when trying to get a shipment that does not exist", async () => {
      const shipmentId = 9999;
      await expect(
        shipmentRepositoryMock.getShipmentById(shipmentId)
      ).rejects.toThrow(`the shipment with ID: ${shipmentId} not found`);
    });

    it("should throw an error when trying to get a shipment with no ID", async () => {
      const shipmentId = null;
      await expect(
        shipmentRepositoryMock.getShipmentById(shipmentId)
      ).rejects.toThrow(`the shipment with ID: ${shipmentId} not found`);
    });
  });

  describe("Delete Shipment", () => {
    it("should delete a shipment", async () => {
      const shipmentData = {
        destination_address: "456 Elm St",
        postal_code: "54321",
        recipient_name: "Eve",
        sender_name: "Charlie",
        weight_kg: 3.0,
      };

      const shipmentId =
        await shipmentRepositoryMock.createShipment(shipmentData);
      const deletedShipment =
        await shipmentRepositoryMock.deleteShipmentById(shipmentId);

      expect(deletedShipment).toBeUndefined();
      expect(shipmentRepositoryMock.shipments.length).toBe(0);
    });

    it("should throw an error when trying to delete a shipment that does not exist", async () => {
      const shipmentId = 9999;
      await expect(
        shipmentRepositoryMock.deleteShipmentById(shipmentId)
      ).rejects.toThrow(`the shipment with ID: ${shipmentId} not found`);
    });
  });

  describe("Calculate Package Category", () => {
    it("should calculate package category correctly", () => {
      expect(calculatePackageCategory(0.05)).toBe("Paquete ultra ligero");
      expect(calculatePackageCategory(0.2)).toBe("Paquete ligero");
      expect(calculatePackageCategory(2.0)).toBe("Paquete estándar");
      expect(calculatePackageCategory(7.0)).toBe("Paquete pesado");
      expect(calculatePackageCategory(12.0)).toBe("Gran volumen");
    });
  });

  describe("Calculate Price", () => {
    it("should calculate price correctly", () => {
      expect(calculatePrice(0.05, "Paquete ultra ligero")).toBe(0.25);
      expect(calculatePrice(0.2, "Paquete ligero")).toBe(2);
      expect(calculatePrice(2.0, "Paquete estándar")).toBe(20);
      expect(calculatePrice(7.0, "Paquete pesado")).toBe(117);
      expect(calculatePrice(12.0, "Gran volumen")).toBe(157);
    });
  });

  describe("Select Carrier", () => {
    it("should select carrier correctly", () => {
      expect(selectCarrier("16500")).toBe("Correos");
      expect(selectCarrier("21000")).toBe("Seur");
      expect(selectCarrier("12345")).toBe("INVENT");
    });
  });
});
