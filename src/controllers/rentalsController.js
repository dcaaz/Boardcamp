import { connectionDB } from "../database/db.js";
import dayjs from "dayjs"

export async function getRentals(req, res) {

    const { customerId, gameId } = req.params;

    const allRentals = `
        SELECT 
            rentals.*,
        ROW_TO_JSON
            (customers.*) AS customer, 
        JSON_BUILD_OBJECT(
            'id',games.id,
            'name',games.name,
            'categoryId',games."categoryId",
            'categoryName',categories.name
            ) AS game 
        FROM 
            rentals
        JOIN 
            customers
        ON 
            customers.id ="customerId"
        JOIN 
            games 
        ON 
            games.id = "gameId" 
        JOIN 
            categories 
        ON 
            categories.id = games."categoryId"
        `

    try {
        if (customerId && gameId) {
            const data = await connectionDB.query(`
                ${allRentals}
                WHERE
                    "customerId"=$1, gameId=$2
            `, [customerId, gameId]);

            return res.send(data.rows);

        } else if (customerId && !gameId) {

            const data = await connectionDB.query(`
                ${allRentals}
                WHERE
                    "customerId"=$1
            `, [customerId]);

            return res.send(data.rows);

        } else if (!customerId && gameId) {

            const data = await connectionDB.query(`
                ${allRentals}
                WHERE
                    "gameId"=$1
            `, [gameId]);

            return res.send(data.rows);

        } else {

            const data = await connectionDB.query(`${allRentals}`);
            return res.send(data.rows);

        }
    }
    catch (err) {
        console.log("err getRentals", err.message);
        res.status(500).send('Server not running');
    }

};

export async function postRentals(req, res) {

    const { customerId, gameId, daysRented } = req.info;
    const day = dayjs().format("YYYY-MM-DD");

    try {

        const gameValuePerDay = await connectionDB.query('SELECT "pricePerDay" FROM games WHERE id=$1', [gameId]);
        const rentAmount = Number(gameValuePerDay.rows[0].pricePerDay) * Number(daysRented);

        await connectionDB.query(`
        INSERT INTO 
            rentals ("customerId", "gameId", "daysRented", "returnDate", "delayFee", "originalPrice", "rentDate") 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, daysRented, null, null, rentAmount, day]);

        return res.sendStatus(201);

    } catch (err) {
        console.log("err postRentals", err.message);
        return res.status(500).send('Server not running');
    }

};

export async function postFinishedRentals(req, res) {
    console.log("CHEGUEI AQUI!!!!!!!!!!!!!!!!!!!")
    const { daysOfDelay, id } = req.info;
    console.log("daysOf", daysOfDelay, id)
    const day = dayjs().format("YYYY-MM-DD");

    try {

        await connectionDB.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;',
            [day, daysOfDelay, id]);
        res.sendStatus(201);

    } catch (err) {
        console.log("err postRentals", err.message);
        res.status(500).send('Server not running');
    }
};

export async function deleteRentals(req, res){

    const {id} = req.params;

    try {
        await connectionDB.query('DELETE FROM rentals WHERE id=$1;', [id]);
        res.sendStatus(200);

    } catch (err){
        console.log("err deleteRentals", err.message);
        res.status(500).send('Server not running');
    }
}