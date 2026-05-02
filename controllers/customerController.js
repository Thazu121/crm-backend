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
        const { id } = req.params
        let { name, email, phone, company } = req.body

        const customer = await customerModel.findById(id)

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        if (customer.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" })
        }


        const existingCustomer = await customerModel.findOne({
            _id: { $ne: id },
            createdBy: req.user.id,
            $or: [
                ...(email ? [{ email }] : []),
                ...(phone ? [{ phone }] : [])
            ]
        })

        if (existingCustomer) {
            return res.status(400).json({
                message: "Email or phone already used"
            })
        }

        if (name) customer.name = name
        if (email) customer.email = email
        if (phone) customer.phone = phone
        if (company !== undefined) customer.company = company

        const updatedCustomer = await customer.save()

        return res.status(200).json({
            message: "Customer updated successfully",
            customer: updatedCustomer
        })

    } catch (error) {
        next(error)
    }
}

const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params

        const customer = await customerModel.findOneAndDelete({
            _id: id,
            createdBy: req.user.id
        })

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found or not authorized"
            })
        }

        return res.status(200).json({
            message: "Customer deleted successfully"
        })

    } catch (error) {
        next(error)
    }
}



export {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomer
}

