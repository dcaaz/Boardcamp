import joi from "joi";

export const gameJoiSchema = joi.object({
    name: joi.string().required()
});