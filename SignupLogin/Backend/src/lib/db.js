import mongoose from "mongoose";

export const connectDBmongo = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URLL)
        console.log(`MONGO_DB CONNECTED TO : ${res.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION ISSUE :",error);
    }
}