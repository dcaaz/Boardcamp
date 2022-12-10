import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";

const routerGames = Router();

routerGames.get('/games', getGames);

routerGames.post('/games', postGames);

export default routerGames;