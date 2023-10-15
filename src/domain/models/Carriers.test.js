import { expect, describe, it } from "vitest";
import { Carrier } from "./Carriers";

describe("Carrier", () => {
  it.only("should create a Carrier object with id and name", () => {
    const carrier = new Carrier(1, "Carrier A");
    expect(carrier).to.be.an.instanceOf(Carrier);
    expect(carrier.getId()).to.equal(1);
    expect(carrier.getName()).to.equal("Carrier A");
  });
});
