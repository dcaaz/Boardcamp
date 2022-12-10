import { connectionDB } from "../database/db.js";

export async function getGames(req, res) {
    const {name} = req.query;

    try {
        //REVISAR ESSA PARTE
        if(name){
            const existGame = await connectionDB.query(`SELECT * FROM games WHERE name ILIKE '${name}'`);
            
            if(existGame.rows > 0){
                res.send(existGame.rows);
            } else {
                res.send("Não existe jogo com esse nome")
            }

    } else {
            const allGames = await connectionDB.query("SELECT * FROM games");
            console.log("allGames", allGames.rows);
            res.send(allGames.rows);
        }
    }
    catch (err) {
        console.log("err postCategories", err.message);
        res.status(500).send('Server not running');
    }
};

export async function postGames(req, res) {
    try {
    }
    catch (err) {
    }
};