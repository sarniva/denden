import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;

        if(!mongoUri){
            throw new Error("MONGODB_URI is not set");
        }

        await mongoose.connect(mongoUri);
        console.log("MongoDB is connected successfully ✅");
        
        
    } catch (error) {
        console.log("MongoDB connection failure ❌", error);
        
        process.exit(1); // exit the process with a failure( 0 means success and 1 means failure)

    }
}