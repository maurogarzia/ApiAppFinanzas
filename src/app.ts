import dotenv from "dotenv"
import app from "./server/server";
import mongoose from "mongoose";
import movementsRoutes from '@routes/MovementRoute'
import usersRoutes from '@routes/UsersRoute'
import authRoutes from '@routes/AuthRouter'

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
