import express from "express";
import cors from "cors";
import routerCategories from "./routers/categoriesRouter.js";
import routerGames from "./routers/gamesRouter.js";
import routerCustomers from "./routers/customersRouter.js";
import routerRentals from "./routers/rentalsRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routerCategories);
app.use(routerGames);
app.use(routerCustomers);
app.use(routerRentals);

const port = 4000;
app.listen(port, () => console.log(`Server running in port ${port}`))