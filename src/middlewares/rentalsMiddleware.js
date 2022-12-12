import { connectionDB } from "../database/db.js";
import { rentalJoiSchema } from "../models/rentalsJoiModels.js";


export async function rentalsValidation (req,res, next){

    const info = req.body;
    console.log("info", info)

    const {error} = rentalJoiSchema.validate(info, {abortEarly: false});

    if(error){
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    } 

    const customerExist = await connectionDB.query("SELECT * FROM customers WHERE id=$1", 
    [info.customerId]); //verificando se o cliente existe

    if (customerExist.rowCount === 0){
        return res.sendStatus(400);
    }

    const gameExist = await connectionDB.query("SELECT * FROM games WHERE id=$1", 
    [info.gameId]); //verificando se o jogo existe

    if(gameExist.rowCount === 0){
        return res.sendStatus(400);
    }

    const gameRentals = await connectionDB.query('SELECT * FROM rentals WHERE "gameId"=$1',
    [info.gameId]); //verificando se tem disponibilidade do jogo

    //VERIFICAR SE ESSA PARTE É === OU < 

    if(gameRentals === gameExist.rows[0].stockTotal){
        return res.sendStatus(400);
    }

    req.info = info;

    next()
}