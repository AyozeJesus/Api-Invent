import { DomainError } from "./DomainError.js";
import { ErrorCode } from "./ErrorCode.js";

export class ShipmentAlreadyExistsError extends DomainError {
  constructor() {
    super(ErrorCode.SHIPMENT_ALREADY_EXISTS, "Shipment already exists");
  }
}
