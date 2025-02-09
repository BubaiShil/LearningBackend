import express from "express"

import authRouter from "./Routes/auth.route.js"
import dotenv from "dotenv"
import { connectDBmongo } from "./lib/db.js"

dotenv.config()
const app = express()

const port = process.env.PORT



app.use("/api/auth",authRouter)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    connectDBmongo()
})