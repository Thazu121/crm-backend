import userModel from "../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const registerUser = async (req, res, next) => {
    try {
        let { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })

        }
        name = name.trim()
    email = email.trim().toLowerCase()
        password = password.trim()
        if (name.length < 3) {
            return res.status(400).json({ message: "Name must contain at least 3 characters" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" });

        }
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 characters with uppercase, lowercase, and number"
            });
        }
        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })

        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
        const userResponse = newUser.toObject()
        delete userResponse.password

        return res.status(201).json({
            message: "User registered successfully",
            user: userResponse
        })

    } catch (err) {
        next(err)
    }
}


