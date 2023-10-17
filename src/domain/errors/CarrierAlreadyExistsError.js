import { DomainError } from "./DomainError.js";
import { ErrorCode } from "./ErrorCode.js";

export class CarrierAlreadyExistsError extends DomainError {
  constructor() {
    super(ErrorCode.CARRIER_ALREADY_EXISTS, "Carrier already exists");
  }
}
