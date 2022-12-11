import { connectionDB } from "../database/db.js";
import { customerJoiSchema } from "../models/customersJoiModels.js";
import joi from "joi";

export async function postCustomerValidation(req, res, next){
    const info = req.body;

    console.log("info", info);

    const {error} = customerJoiSchema.validate(info, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }  

    const cpfExist = await connectionDB.query("SELECT cpf FROM customers WHERE cpf=$1", [info.cpf]);

    if(cpfExist.rowCount > 0){
        return res.sendStatus(409)
    }

    const day = joi.date();

    //VERIFICAR O MOTIVO DE COM DATAS ANTIGAS, NÃO FUNCIONAR

    try {
        joi.attempt(info.birthday, day);
    } catch(err) {
        console.log("err day", err);
        return res.sendStatus(400);
    }

    req.info = info;

    next();
}

export async function putCustomerValidation(req, res, next){
    const { id } = req.params;
    const info = req.body;

    console.log("info", info);

    const {error} = customerJoiSchema.validate(info, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }  

    const cpfExist = await connectionDB.query("SELECT * FROM customers WHERE cpf=$1 AND id<>$2", 
    [info.cpf, id]); //<> verifica se os valores dos dois operandos são iguais ou não, se os valores não forem iguais a condição torna-se verdadeira.

    if (cpfExist.rowCount > 0){
        return res.sendStatus(409);
    }

    const day = joi.date();

    try {
        joi.attempt(info.birthday, day);
    } catch(err) {
        console.log("err day", err);
        return res.sendStatus(400);
    }

    req.info = info;

    next();
}