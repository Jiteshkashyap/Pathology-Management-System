import mongoose from "mongoose";

 const connectDB=async()=>{
    try {
       const connect = await mongoose.connect(process.env.MONGO_URI)
       console.log(`MongoDB connected:${connect.connection.host}, ${connect.connection.name}`)
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message)
        process.exit(1)
    }
}

export default connectDB;