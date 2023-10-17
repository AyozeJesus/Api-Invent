import { generateError } from "../domain/utils/helpers.js";
import { CarrierRepository } from "./CarrierRepository.js";

export class CarrierService {
  constructor() {
    this.carrierRepository = new CarrierRepository();
  }

  async createCarrier(name) {
    return await this.carrierRepository.createCarrier(name);
  }

  async listCarriers() {
    return await this.carrierRepository.listCarriers();
  }

  async getCarrierById(id) {
    if (!id) {
      throw generateError("No se proporcionó un ID.", 400);
    }
    return await this.carrierRepository.getCarrierById(id);
  }

  async updateCarrierName(id, name) {
    if (!id) {
      throw generateError("No se proporcionó un ID.", 400);
    }
    return await this.carrierRepository.updateCarrierName(id, name);
  }

  async deleteCarrierById(id) {
    if (!id) {
      throw generateError("No se proporcionó un ID.", 400);
    }
    return await this.carrierRepository.deleteCarrierById(id);
  }
}
