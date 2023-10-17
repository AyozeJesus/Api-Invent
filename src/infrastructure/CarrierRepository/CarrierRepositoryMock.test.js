import { describe, it, expect } from "vitest";
import { MockCarrierRepository } from "./CarrierRepositoryMock";

const mockCarrierRepository = new MockCarrierRepository();

describe("CarrierService", () => {
  it("should create a carrier", async () => {
    const carrierId = await mockCarrierRepository.createCarrier("Test Carrier");
    expect(carrierId).toBe(4);
  });

  it("should list carriers", async () => {
    const carriers = await mockCarrierRepository.listCarriers();
    expect(carriers).toHaveLength(4);

    it("should get a carrier by ID", async () => {
      const carrier = await mockCarrierRepository.getCarrierById(2);
      expect(carrier.id).toBe(2);
    });

    it("should update a carrier name", async () => {
      await mockCarrierRepository.updateCarrierName(3, "Updated Carrier");
      const updatedCarrier = await mockCarrierRepository.getCarrierById(3);
      expect(updatedCarrier.name).toBe("Updated Carrier");
    });

    it("should delete a carrier by ID", async () => {
      await mockCarrierRepository.deleteCarrierById(1);
      const carriers = await mockCarrierRepository.listCarriers();
      expect(carriers).toHaveLength(3);
    });
  });
});
