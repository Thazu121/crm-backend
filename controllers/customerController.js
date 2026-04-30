import { customerModel } from "../models/customerModel.js";

const addCustomer = async (req, res, next) => {
    try {
        let { name, email, phone, company } = req.body

        const existingCustomer = await customerModel.findOne({
            $or: [{ email }, { phone }]
        })

        if (existingCustomer) {
            const err = new Error("Customer with this email or phone already exists")
            err.statusCode = 400
            return next(err)

        }


        const customer = await customerModel.create({
            name,
            email,
            phone,
            company,
            createdBy: req.user.id
        })
        return res.status(201).json({ message: "customer added successfully", customer })
    } catch (error) {
        next(error)
    }

}
const getAllCustomer = async (req, res, next) => {
    try {
        const customers = await customerModel.find({
            createdBy: req.user.id
        })
            .sort({ createdAt: -1 })


        return res.status(200).json({
            message: "Successfully fetched",
            count: customers.length,
            customers
        })

    } catch (error) {
        next(error)
    }
}
const updateCustomer = async (req, res, next) => {
    try {
        const { name, email, phone, company } = req.body

    } catch (error) {

    }
}




export {
    addCustomer
}

