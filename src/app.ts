import dotenv from "dotenv"
import app from "./server/server";
import mongoose from "mongoose";
import movementsRoutes from '../src/routes/MovementRoute'
import usersRoutes from '../src/routes/UsersRoute'
import authRoutes from '../src/routes/AuthRouter'

dotenv.config()

import './config/passport'


mongoose.connect(process.env.MONGO_URL!)   
.then(() => {
    console.log('Conectado');
})
.catch((error) => {
    console.log('Ocurrio un error', error);
    
})

app.use('/appFinance/auth', authRoutes)
app.use('/appFinance/movements', movementsRoutes)
app.use('/appFinance/users', usersRoutes)


export default app
