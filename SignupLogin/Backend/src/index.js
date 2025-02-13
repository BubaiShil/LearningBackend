import express from "express"
import cookie from 'cookie-parser'
import cors from 'cors'
import authRouter from "./Routes/auth.route.js"
import dotenv from "dotenv"
import { connectDBmongo } from "./lib/db.js"

dotenv.config()
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cookie()) ////////////////////////////////////////////
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))

app.use("/api/auth",authRouter)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    connectDBmongo()
})