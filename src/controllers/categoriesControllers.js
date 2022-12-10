import { connectionDB } from "../database/db.js";

export async function getCategories (req, res) {
    try {

        const allCategories = await connectionDB.query("SELECT * FROM categories");
        console.log("all", allCategories.rows)
        res.send(allCategories.rows);

    }
    catch (err) {
        console.log("err getCategories", err);
        res.status(500).send('Server not running');
    }
};

export async function postCategories (req, res){
    const {name} = req.body;

    try{

        const result = await connectionDB.query("INSERT INTO categories (name) VALUES ($1)", [name]);
        res.send(201);

    } catch (err){
        console.log("err postCategories", err);
        res.status(500).send('Server not running');
    }
};