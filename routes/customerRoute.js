import express from "express"
import {
    addCustomer,
    deleteCustomer,
    getAllCustomer,
    updateCustomer,searchCustomers
} from "../controllers/customerController.js"

import authMiddleware from "../middlewares/authMiddleware.js"
import validateCustomer from "../middlewares/validateCustomer.js"

const customerRouter = express.Router()

customerRouter.post("/add", authMiddleware, validateCustomer, addCustomer)

customerRouter.get("/all", authMiddleware, getAllCustomer)

customerRouter.put("/edit/:id", authMiddleware, updateCustomer)

customerRouter.delete("/delete/:id", authMiddleware, deleteCustomer)

customerRouter.get("/search",authMiddleware, searchCustomers)


export default customerRouter
