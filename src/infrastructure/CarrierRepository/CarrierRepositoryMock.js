import { CarrierRepository } from "../../domain/repository/CarrierRepository.js";

export class MockCarrierRepository extends CarrierRepository {
  constructor() {
    super();

    this.carriers = [
      { id: 1, name: "Carrier 1" },
      { id: 2, name: "Carrier 2" },
      { id: 3, name: "Carrier 3" },
    ];
  }

  async createCarrier(name) {
    const newCarrier = { id: this.carriers.length + 1, name };
    this.carriers.push(newCarrier);
    return newCarrier.id;
  }

  async listCarriers() {
    return this.carriers;
  }

  async getCarrierById(id) {
    return this.carriers.find((carrier) => carrier.id === id);
  }

  async updateCarrierName(id, name) {
    const carrier = this.carriers.find((c) => c.id === id);
    if (carrier) {
      carrier.name = name;
    }
  }

  async deleteCarrierById(id) {
    const index = this.carriers.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.carriers.splice(index, 1);
    }
  }
}
