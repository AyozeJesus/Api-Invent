import {
  calculatePackageCategory,
  calculatePrice,
  selectCarrier,
  isValidPostalCode,
} from "../../domain/utils/shipmentUtils.js";
import { ShipmentRepository } from "../repository/ShipmentRepository.js";

class ShipmentService {
  constructor() {
    this.shipmentRepository = new ShipmentRepository();
  }

  async createShipment({
    destination_address,
    postal_code,
    recipient_name,
    sender_name,
    weight_kg,
  }) {
    if (!isValidPostalCode(postal_code)) {
      throw new Error(
        "Please enter a 5-digit postal code between 00001 and 99999."
      );
    }

    if (
      !destination_address ||
      !postal_code ||
      !recipient_name ||
      !sender_name ||
      !weight_kg ||
      !isValidPostalCode(postal_code)
    ) {
      throw new Error("Please provide all required shipment information.");
    }

    const package_category = calculatePackageCategory(weight_kg);
    const shipping_company = selectCarrier(postal_code);
    const price = calculatePrice(weight_kg, package_category);

    const shipmentData = {
      destination_address,
      postal_code,
      recipient_name,
      sender_name,
      weight_kg,
      shipping_company,
      package_category,
      price,
    };

    const shipmentId =
      await this.shipmentRepository.createShipment(shipmentData);

    return shipmentId;
  }

  async listShipments() {
    return this.shipmentRepository.listShipments();
  }

  async deleteShipmentById(id) {
    return this.shipmentRepository.deleteShipmentById(id);
  }

  async getShipmentById(id) {
    const shipment = this.shipmentRepository.getShipmentById(id);
    if (!shipment) {
      throw new Error(`the shipment with ID: ${id} not found`);
    }
    return shipment;
  }
}

export default ShipmentService;
