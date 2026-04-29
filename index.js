import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/userRoute"

dotenv.config()
const app=express()
app.use(express.json())
app.use("/",userRouter)
const PORT = process.env.PORT 
connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})