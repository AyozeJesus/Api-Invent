import { ShipmentRepository } from "../../domain/repository/ShipmentRepository";
import { isValidPostalCode } from "../../domain/utils/shipmentUtils";

export class ShipmentRepositoryMock extends ShipmentRepository {
  constructor() {
    super();
    this.shipments = [];
  }

  async createShipment(shipmentData) {
    if (!isValidPostalCode(shipmentData.postal_code)) {
      throw new Error(
        "Please enter a 5-digit postal code between 00001 and 99999."
      );
    }
    if (
      !shipmentData.destination_address ||
      !shipmentData.postal_code ||
      !shipmentData.recipient_name ||
      !shipmentData.sender_name ||
      !shipmentData.weight_kg
    ) {
      throw new Error("Please provide all required shipment information.");
    }
    const newShipment = { id: this.shipments.length + 1, ...shipmentData };
    this.shipments.push(newShipment);
    return newShipment.id;
  }

  async listShipments() {
    return this.shipments;
  }

  async getShipmentById(id) {
    const shipment = this.shipments.find((shipment) => shipment.id === id);
    if (!shipment) {
      throw new Error(`the shipment with ID: ${id} not found`);
    }
    return shipment;
  }

  async deleteShipmentById(id) {
    const shipmentIndex = this.shipments.findIndex(
      (shipment) => shipment.id === id
    );

    if (shipmentIndex === -1) {
      throw new Error(`the shipment with ID: ${id} not found`);
    }

    this.shipments.splice(shipmentIndex, 1);
  }
}
