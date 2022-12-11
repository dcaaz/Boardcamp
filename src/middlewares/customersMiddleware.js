import { connectionDB } from "../database/db.js";
import { customerJoiSchema } from "../models/customersJoiModels.js";
import joi from "joi";

export async function customerValidation(req, res, next){
    const info = req.body;

    console.log("info", info);

    const {error} = customerJoiSchema.validate(info, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }  

    const cpfExist = await connectionDB.query("SELECT cpf FROM customers WHERE cpf=$1", [info.cpf]);

    if(cpfExist.rowCount > 0){
        return res.sendStautus(409)
    }

    const day = joi.date();

    try {
        joi.attempt(info.birthday, day);
    } catch {
        return res.sendStatus(400);
    }

    req.info = info;

    next();
}