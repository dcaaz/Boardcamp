import joi from "joi";

export const rentalJoiSchema = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().min(1).required(),
  daysRented: joi.number().min(1).greater(0).required()
});