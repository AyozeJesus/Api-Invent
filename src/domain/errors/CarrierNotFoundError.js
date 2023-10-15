import { DomainError } from "./DomainError.js";
import { ErrorCode } from "./ErrorCode.js";

export class CarrierNotFoundError extends DomainError {
  constructor() {
    super(ErrorCode.CARRIER_NOT_FOUND, "Carrier not found");
  }
}
