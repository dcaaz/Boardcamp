import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categoriesControllers.js";
import { categoryValidation } from "../middlewares/categoryMiddleware.js";

const routerCategories = Router();

routerCategories.get('/categories', getCategories);

routerCategories.post('/categories', categoryValidation, postCategories);

export default routerCategories;