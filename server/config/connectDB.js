import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please Provide MONGODB_URI in the .env File");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected DB")
  } catch (error) {
    console.log("error while connectDB", error)
    process.exit(1)
  }
}


export default connectDB;