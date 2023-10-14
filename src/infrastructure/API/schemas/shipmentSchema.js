const Joi = require("joi")

const newShipmentSchema = Joi.object({
  destination_address: Joi.string().max(255).required(),
  postal_code: Joi.string()
    .pattern(/^\d{5}$/)
    .required(),
  recipient_name: Joi.string().max(255).required(),
  sender_name: Joi.string().max(255).required(),
  weight_kg: Joi.number().precision(2).required(),
  shipping_company: Joi.string().valid("Correos", "Seur", "INVENT").required(),
  package_category: Joi.string().max(50).required(),
  price: Joi.number().precision(2).required(),
})

const getShipmentSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
})

module.exports = {
  newShipmentSchema,
  getShipmentSchema,
}
