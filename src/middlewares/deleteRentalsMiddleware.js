import { connectionDB } from "../database/db.js";


export async function deleteValidation(req, res, next){
    const {id} = req.params;

    const idExist = await connectionDB.query('SELECT * FROM rentals WHERE id=$1', [id]);

    if (idExist.rowCount === 0){
        return res.sendStatus(404);
    }

    const filled = await connectionDB.query('SELECT "returnDate" FROM rentals WHERE id=$1;', [id]);

    if(!filled.rows[0].returnDate){
        return res.sendStatus(400);
    }

    next();
}