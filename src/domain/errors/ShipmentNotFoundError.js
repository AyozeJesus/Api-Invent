import { DomainError } from "./DomainError.js";
import { ErrorCode } from "./ErrorCode.js";

export class ShipmentNotFoundError extends DomainError {
  constructor() {
    super(ErrorCode.SHIPMENT_NOT_FOUND, "Shipment not found");
  }
}
