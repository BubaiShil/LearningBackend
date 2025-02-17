import express from 'express'
import cookie from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use(cookie())



//app.use('/api/ ',)


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    
})