import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categoriesControllers.js";
import { gameValidation } from "../middlewares/gameMiddleware.js";

const routerCategories = Router();

routerCategories.get('/categories', getCategories);

routerCategories.post('/categories', gameValidation, postCategories);

export default routerCategories;