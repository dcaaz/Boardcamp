import express from "express";
import cors from "cors";
import routerCategories from "./routers/categoriesRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routerCategories);

const port = 5000;
app.listen(port, () => console.log(`Server running in port ${port}`))