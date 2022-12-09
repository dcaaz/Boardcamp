import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const connection = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "daniedavi",
    database: "boardcamp",
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/categories', async (req, res) => {
    try {

        const allCategories = await connection.query("SELECT * FROM categories");
        console.log("all", allCategories.rows)
        res.send(allCategories.rows);

    }
    catch (err) {

        console.log(err.message);
        res.status(500).send('Server not running');

    }
});

app.post('/categories', (req, res) => {

})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`))