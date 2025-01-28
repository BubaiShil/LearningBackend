import mongoose from 'mongoose'


export const DBconnect = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MONGO_DB CONNECTED TO : ${conn.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB CONNECTION ISSUE :",error);
        
    }
}