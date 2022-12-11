import { connectionDB } from "../database/db.js";

export async function getCustomersCPF(req, res) {

    const { cpf } = req.query;

    try {
        if (cpf) {

            const customerCPF = await connectionDB.query(`SELECT * FROM customers WHERE cpf ILIKE '${cpf}%'`);
            console.log("customerCPF", customerCPF);
            res.send(customerCPF.rows);

        } else {

            const allCustomers = await connectionDB.query("SELECT * FROM customers");
            console.log("allCustomers", allCustomers);
            res.send(allCustomers.rows);
        }

    } catch (err) {
        console.log("err getCustomersCPF", err.message);
        res.status(500).send('Server not running');
    }
}

export async function getCustomersID(req, res) {

    const { id } = req.params;

    try {

        const customerID = await connectionDB.query("SELECT * FROM customers WHERE id=$1", [id]);

        if (customerID.rowCount > 0) {
            console.log("customerID", customerID);
            return res.send(customerID.rows);
        } else {
            return res.sendStatus(404);
        }

    } catch (err) {
        console.log("err getCustomersID", err.message);
        res.status(500).send('Server not running');
    }

}

export async function postCustomers(req, res) {

    const {name, phone, cpf, birthday} = req.info;

    try{

        await connectionDB.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
            [name, phone, cpf, birthday]);

        res.sendStatus(201);

    } catch (err){
        console.log("err postCustomers", err.message);
        res.status(500).send('Server not running');
    }

}