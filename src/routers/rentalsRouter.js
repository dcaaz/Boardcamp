import { Router } from "express";
//import { gameValidation } from "../middlewares/gameMiddleware.js";
import { getRentals } from "../controllers/rentalsController.js";

const routerRentals = Router();

routerRentals.get('/rentals', getRentals);

//routerRentals.post('/rentals', gameValidation, postRental);

export default routerRentals;