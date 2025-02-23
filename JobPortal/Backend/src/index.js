import express from 'express'
import cookie from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './Routes/user.route.js'
import companyRoutes from './Routes/commpany.route.js'
import jobRoutes from './Routes/job.route.js'
import applicationRoutes from './Routes/application.route.js'
import { DBconnect } from './Utils/db.js';

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use(cookie())



app.use('/api/v1/user',authRoutes)
app.use('/api/v1/company',companyRoutes)
app.use('/api/v1/job',jobRoutes)
app.use('/api/v1/application',applicationRoutes)

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    DBconnect()
})