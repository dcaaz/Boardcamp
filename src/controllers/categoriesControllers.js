import { connectionDB } from "../database/db.js";

export async function getCategories (req, res) {
    try {

        const allCategories = await connectionDB.query("SELECT * FROM categories");
        console.log("all", allCategories.rows)
        res.send(allCategories.rows);

    }
    catch (err) {
        res.status(500).send('Server not running');
    }
};

export async function postCategories (req, res){
};