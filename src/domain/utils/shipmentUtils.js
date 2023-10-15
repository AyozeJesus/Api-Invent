export function calculatePackageCategory(weight_kg) {
  if (weight_kg <= 0.1) {
    return "Paquete ultra ligero";
  } else if (weight_kg <= 0.3) {
    return "Paquete ligero";
  } else if (weight_kg <= 5) {
    return "Paquete estándar";
  } else if (weight_kg <= 10) {
    return "Paquete pesado";
  } else {
    return "Gran volumen";
  }
}

export function calculatePrice(weight_kg, package_category) {
  switch (package_category) {
    case "Paquete ultra ligero":
      return weight_kg * 5;
    case "Paquete ligero":
      return weight_kg * 5 + 1;
    case "Paquete estándar":
      return weight_kg * 10;
    case "Paquete pesado":
      return weight_kg * 5 + weight_kg + 75;
    case "Gran volumen":
      return (weight_kg - 10) * 7.5 + 130 + weight_kg;
    default:
      return 0;
  }
}
export function selectCarrier(postal_code) {
  const postalCodeNumber = parseInt(postal_code);

  if (postalCodeNumber >= 15000 && postalCodeNumber <= 19999) {
    return "Correos";
  } else if (postalCodeNumber >= 20000 && postalCodeNumber <= 25000) {
    return "Seur";
  } else {
    return "INVENT";
  }
}
