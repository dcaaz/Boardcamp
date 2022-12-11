import { Router } from "express";
import { postCustomers, getCustomersCPF, getCustomersID } from "../controllers/customersController.js";
import { customerValidation } from "../middlewares/customersMiddleware.js";

const routerCustomers = Router();

routerCustomers.get('/customers/', getCustomersCPF);
routerCustomers.get('/customers/:id', getCustomersID);
routerCustomers.post('/customers/', customerValidation, postCustomers);

export default routerCustomers;