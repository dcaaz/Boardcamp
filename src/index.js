import express from "express";
import cors from "cors";
import routerCategories from "./routers/categoriesRouter.js";
import routerGames from "./routers/gameRouter.js";
import routerCustomers from "./routers/customersRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routerCategories);
app.use(routerGames);
app.use(routerCustomers);

const port = 5000;
app.listen(port, () => console.log(`Server running in port ${port}`))