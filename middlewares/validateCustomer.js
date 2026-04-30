const validateCustomer = (req, res, next) => {
    let { name, email, phone } = req.body

    if (!name || !email || !phone) {
        return res.status(400).json({
            message: "Name, email and phone are required"
        })
    }

    name = name.trim()
    email = email.trim().toLowerCase()
    phone = phone.trim()

    if (name.length < 3) {
        return res.status(400).json({
            message: "Name must be at least 3 characters"
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" })
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({
            message: "Phone must be 10 digits"
        })
    }

    req.body.name = name
    req.body.email = email
    req.body.phone = phone

    next()
}

export default validateCustomer
