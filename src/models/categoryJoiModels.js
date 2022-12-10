import joi from "joi";

export const categoryJoiSchema = joi.object({
    name: joi.string().required()
});