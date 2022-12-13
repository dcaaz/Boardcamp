import { connectionDB } from "../database/db.js";

export async function finishedValidation (req, res, next){
    const {id} = req.params;
    let daysOfDelay = 0;

    try{

        const dayRented = await connectionDB.query('SELECT "rentDate", "gameId", "daysRented", "returnDate" FROM rentals WHERE id=$1;', [id]);
        //por quantos dias o cliente agendou o aluguel
        const priceGame = await connectionDB.query('SELECT * FROM games WHERE id=$1;', [dayRented.rows[0].gameId]);
        
        if(dayRented.rowCount === 0){
            return res.sendStatus(404)
        }

        const now  = new Date();
        const rentDay = new Date(dayRented.rows[0].rentDate); //dia do alugel
        const total = Math.abs(now.getTime() - rentDay.getTime()); //diferença
        let days = Math.ceil(total / (1000 * 60 * 60 * 24));
        days = days - dayRented.rows[0].daysRented;

        if(days > 0){
            daysOfDelay = days * priceGame.rows[0].pricePerDay;
        }

        req.info = {daysOfDelay, id};


    } catch (err){
        console.log("erro finishedRentalsMiddleware", err.message);
        res.status(500).send('Server not running');
    }

    next()
}