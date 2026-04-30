import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        console.log("AUTH HEADER:", authHeader)

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized - No token" })
        }

        const token = authHeader.split(" ")[1]

        console.log("TOKEN:", token)

        if (!token) {
            return res.status(401).json({ message: "Token missing" })
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Server configuration error" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
        console.log("JWT ERROR:", error.message)
        return res.status(403).json({ message: "Forbidden" })
    }
}

export default authMiddleware
