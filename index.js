import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import customerRouter from "./routes/customerRoute.js"
import connectDB from "./config/dbConnection.js"
import errorHandler from "./middlewares/errorHandler.js"
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors({
  origin: [
    "https://crm-frontend-one-eta.vercel.app"
  ],
  credentials: true
}));

app.use("/users",userRouter)
app.use("/",customerRouter)
app.use(errorHandler)
const PORT = process.env.PORT 
connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})