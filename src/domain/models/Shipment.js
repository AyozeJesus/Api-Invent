export class Shipment {
  static create(
    id,
    destinationAddress,
    postalCode,
    recipientName,
    senderName,
    weightKg,
    shippingCompany,
    packageCategory,
    price
  ) {
    return new Shipment(
      id,
      destinationAddress,
      postalCode,
      recipientName,
      senderName,
      weightKg,
      shippingCompany,
      packageCategory,
      price
    );
  }

  constructor(
    id,
    destinationAddress,
    postalCode,
    recipientName,
    senderName,
    weightKg,
    shippingCompany,
    packageCategory,
    price
  ) {
    this.id = id;
    this.destinationAddress = destinationAddress;
    this.postalCode = postalCode;
    this.recipientName = recipientName;
    this.senderName = senderName;
    this.weightKg = weightKg;
    this.shippingCompany = shippingCompany;
    this.packageCategory = packageCategory;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  hasId(id) {
    return this.id === id;
  }

  hasDestinationAddress(destinationAddress) {
    return this.destinationAddress === destinationAddress;
  }

    hasPostalCode(postalCode) {
        return this.postalCode === postalCode;
    }

    hasRecipientName(recipientName) {
        return this.recipientName === recipientName;
    }

    hasSenderName(senderName) {
        return this.senderName === senderName;
    }

    hasWeightKg(weightKg) {
        return this.weightKg === weightKg;
    }

    hasShippingCompany(shippingCompany) {
        return this.shippingCompany === shippingCompany;
    }

    hasPackageCategory(packageCategory) {
        return this.packageCategory === packageCategory;
    }

    hasPrice(price) {
        return this.price === price;
    }

    getPrice() {
        return this.price;
    }

    getDestinationAddress() {
        return this.destinationAddress;
    }

    getPostalCode() {
        return this.postalCode;
    }

    getRecipientName() {
        return this.recipientName;
    }

    getSenderName() {
        return this.senderName;
    }

    getWeightKg() {
        return this.weightKg;
    }

    getShippingCompany() {
        return this.shippingCompany;
    }

    getPackageCategory() {
        return this.packageCategory;
    }

    setPrice(price) {
        this.price = price;
    }

    setDestinationAddress(destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    setPostalCode(postalCode) {
        this.postalCode = postalCode;
    }   

    setRecipientName(recipientName) {
        this.recipientName = recipientName;
    }   

    setSenderName(senderName) {
        this.senderName = senderName;
    }

    setWeightKg(weightKg) {
        this.weightKg = weightKg;
    }

    setShippingCompany(shippingCompany) {
        this.shippingCompany = shippingCompany;
    }

    setPackageCategory(packageCategory) {
        this.packageCategory = packageCategory;
    }
}
