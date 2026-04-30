import express from "express"
import { addCustomer } from "../controllers/customerController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const customerRouter=express.Router()

customerRouter.post("/add",authMiddleware,addCustomer)
export default customerRouter