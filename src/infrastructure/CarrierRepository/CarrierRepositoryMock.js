import CarrierService from "./CarrierService.js";
export class MockCarrierService extends CarrierService {
  constructor() {
    super();
    // Puedes agregar datos iniciales para simular la base de datos.
    this.carriers = [
      { id: 1, name: "Carrier 1" },
      { id: 2, name: "Carrier 2" },
      { id: 3, name: "Carrier 3" },
    ];
  }

  async createCarrier(name) {
    // Simular la creación de un transportista y devolver el ID.
    const newCarrier = { id: this.carriers.length + 1, name };
    this.carriers.push(newCarrier);
    return newCarrier.id;
  }

  async listCarriers() {
    // Simular la obtención de la lista de transportistas.
    return this.carriers;
  }

  async getCarrierById(id) {
    // Simular la obtención de un transportista por ID.
    return this.carriers.find((carrier) => carrier.id === id);
  }

  async updateCarrierName(id, name) {
    // Simular la actualización del nombre de un transportista.
    const carrier = this.carriers.find((c) => c.id === id);
    if (carrier) {
      carrier.name = name;
    }
  }

  async deleteCarrierById(id) {
    // Simular la eliminación de un transportista por ID.
    const index = this.carriers.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.carriers.splice(index, 1);
    }
  }
}
