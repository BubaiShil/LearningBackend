import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { DBconnect } from "./lib/db.js";

const app = express()
dotenv.config()
const port = process.env.PORT

app.use(express.json()) // to get pass,name,email from frontend body
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)



app.listen(port,()=>{
    console.log(`SERVER IS RUNNING ON : ${port}`);
    DBconnect()
})