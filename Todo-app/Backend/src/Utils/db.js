import mongoose from "mongoose";


export const connectMongo =async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MONGO_DB CONNECTED TO : ${res.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION ISSUE :",error);
    }
}