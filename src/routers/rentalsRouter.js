import { Router } from "express";
import { getRentals, postRentals, postFinishedRentals, deleteRentals } from "../controllers/rentalsController.js";
import { finishedValidation } from "../middlewares/finishedRentalsMiddleware.js";
import { rentalsValidation, gamesAvailableInStock } from "../middlewares/rentalsMiddleware.js";
import { deleteValidation } from "../middlewares/deleteRentalsMiddleware.js";


const routerRentals = Router();

routerRentals.get('/rentals', getRentals);

routerRentals.post('/rentals', rentalsValidation, gamesAvailableInStock, postRentals);

routerRentals.post('/rentals/:id/return', finishedValidation, postFinishedRentals);

routerRentals.delete('/rentals/:id', deleteValidation, deleteRentals);

export default routerRentals;