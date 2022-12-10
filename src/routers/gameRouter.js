import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import { gameValidation } from "../middlewares/gameMiddleware.js";

const routerGames = Router();

routerGames.get('/games', getGames);

routerGames.post('/games', gameValidation, postGames);

export default routerGames;