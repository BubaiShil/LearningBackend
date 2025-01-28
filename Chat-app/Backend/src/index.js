import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import { DBconnect } from "./lib/db.js";

const app = express()
dotenv.config()
const port = process.env.PORT

app.use(express.json()) // to get pass,name,email from frontend body
app.use("/api/auth",authRoutes)



app.listen(port,()=>{
    console.log(`SERVER IS RUNNING ON : ${port}`);
    DBconnect()
})