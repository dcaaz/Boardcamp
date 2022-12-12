import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentalsController.js";
import { rentalsValidation } from "../middlewares/rentalsMiddleware.js";

const routerRentals = Router();

routerRentals.get('/rentals', getRentals);

routerRentals.post('/rentals', rentalsValidation, postRentals);

export default routerRentals;