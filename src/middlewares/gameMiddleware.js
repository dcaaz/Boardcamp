import { connectionDB } from "../database/db.js";
import { gameJoiSchema } from "../models/gamesJoiModels.js";

export async function gameValidation(req, res, next) {

    const info = req.body;

    const { error } = gameJoiSchema.validate(info, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    const nameExist = await connectionDB.query("SELECT * FROM games WHERE name=$1", [info.name]);

    if (nameExist.rowCount > 0) {
        return res.sendStatus(409);
    }

    const idExist = await connectionDB.query("SELECT * FROM categories WHERE id=$1", [info.categoryId]);

    if (idExist.rowCount === 0) {
        return res.sendStatus(400);
    }

    req.info = info;

    next();
}