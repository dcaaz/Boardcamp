import { connectionDB } from "../database/db.js";
import { categoryJoiSchema } from "../models/categoryJoiModels.js";

export async function categoryValidation(req, res, next){

    const name = req.body;

    const {error} = categoryJoiSchema.validate(name, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    const categoryExist = await connectionDB.query("SELECT name FROM categories WHERE name=$1", [name.name]);
    
    if (categoryExist.rowCount > 0){ 
        //rowCount é campo dentro do objeto que retorna o numero de registros das intruções do select, no caso, o name
        return res.sendStatus(409);
    }

    next();
}

