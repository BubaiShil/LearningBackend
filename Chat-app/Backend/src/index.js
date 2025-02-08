import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { DBconnect } from "./lib/db.js";
import { app,Server } from "./lib/socket.js";

//const app = express()
dotenv.config()
const port = process.env.PORT

//app.use(express.json()) 
app.use(express.json({ limit: "10mb" })); // to get pass,name,email from frontend body
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser())
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)



Server.listen(port,()=>{
    console.log(`SERVER IS RUNNING ON : ${port}`);
    DBconnect()
})