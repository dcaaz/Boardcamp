import {Router} from "express";
import { getCategories } from "../controllers/categoriesControllers.js";
import { postCategories } from "../controllers/categoriesControllers.js";

const routerCategories = Router();

routerCategories.get('/categories', getCategories);

routerCategories.post('/categories', postCategories);

export default routerCategories;