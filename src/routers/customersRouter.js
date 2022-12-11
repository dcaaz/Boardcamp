import { Router } from "express";
import { postCustomers, getCustomersCPF, getCustomersID } from "../controllers/customersController.js";
//import { categoryValidation } from "../middlewares/categoryMiddleware.js";

const routerCustomers = Router();

routerCustomers.get('/customers/', getCustomersCPF);
routerCustomers.get('/customers/:id', getCustomersID);
routerCustomers.post('/customers/', postCustomers);

//routerCategories.post('/categories', categoryValidation, postCategories);

export default routerCustomers;