import { connectionDB } from "../database/db.js";

export async function getRentals(req, res) {
   
    try {
    }
    catch (err) {
        console.log("err postRentals", err.message);
        res.status(500).send('Server not running');
    }
};