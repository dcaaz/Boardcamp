import { connectionDB } from "../database/db.js";
import dayjs from "dayjs"

export async function getRentals(req, res) {
   
    try {
    }
    catch (err) {
        console.log("err getRentals", err.message);
        res.status(500).send('Server not running');
    }

};

export async function postRentals(req, res) {
   
    const { customerId, gameId, daysRented } = req.info;
    const day = dayjs().format("YYYY-MM-DD");

    try{

        const gameValuePerDay = await connectionDB.query('SELECT "pricePerDay" FROM games WHERE id=$1', [gameId]);
        const rentAmount = Number(gameValuePerDay.rows[0].pricePerDay) * Number(daysRented);

        await connectionDB.query(`
        INSERT INTO 
            rentals ("customerId", "gameId", "daysRented", "returnDate", "delayFee", "originalPrice", "rentDate") 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
        [customerId, gameId, daysRented, null, null, rentAmount, day]);

        res.sendStatus(201);

    } catch (err){
        console.log("err postRentals", err.message);
        res.status(500).send('Server not running');
    }

};