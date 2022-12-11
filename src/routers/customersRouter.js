import { Router } from "express";
import { postCustomers, getCustomersCPF, getCustomersID, putCustomersID } from "../controllers/customersController.js";
import { postCustomerValidation, putCustomerValidation } from "../middlewares/customersMiddleware.js";

const routerCustomers = Router();

routerCustomers.get('/customers/', getCustomersCPF);
routerCustomers.get('/customers/:id', getCustomersID);
routerCustomers.post('/customers/', postCustomerValidation, postCustomers);
routerCustomers.put('/customers/:id', putCustomerValidation, putCustomersID);

export default routerCustomers;