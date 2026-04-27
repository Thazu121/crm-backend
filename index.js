import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app=express()
app.use(express.json())
const PORT = process.env.PORT 
connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})