import mongoose from "mongoose";
const connectDB=async () => {
    try {
        await mongoose.connect(process.env.DATABASE_ATLAS_URL)
        console.log("dATABASE CONNECTED");
        
    } catch (error) {
            console.log(error)

    }
    
}
export default connectDB