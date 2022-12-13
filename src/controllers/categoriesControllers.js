import { connectionDB } from "../database/db.js";

export async function getCategories (req, res) {
    try {

        const allCategories = await connectionDB.query("SELECT * FROM categories;");
        res.send(allCategories.rows);

    }
    catch (err) {
        console.log("err getCategories", err.message);
        res.status(500).send('Server not running');
    }
};

export async function postCategories (req, res){
    const {name} = req.body;

    try{

        const result = await connectionDB.query("INSERT INTO categories (name) VALUES ($1);", [name]);
        res.sendStatus(201);

    } catch (err){
        console.log("err postCategories", err.message);
        res.status(500).send('Server not running');
    }
};