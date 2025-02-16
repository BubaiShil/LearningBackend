import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import todoRoutes from './Routes/todo.route.js'
import { connectMongo } from './Utils/db.js'

dotenv.config();
const app = express();
const Port = process.env.PORT;

app.use(express.json()); 
app.use(cors({
    origin : 'http://localhost:5173',
}))


app.use('/api/todo',todoRoutes)

app.listen(Port,()=>{
    console.log(`Running on ${Port}`);
    connectMongo()
})