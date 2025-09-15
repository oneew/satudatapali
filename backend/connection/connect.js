// connect to mongodb from mongoclient package
import mongoose from "mongoose";
import dotenv from "dotenv";

// load env variables
dotenv.config();

const conn = mongoose;

// connect to mongodb
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;