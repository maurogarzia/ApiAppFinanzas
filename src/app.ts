import app from "./server/server";
import movementsRoutes from './routes/MovementRoute'
import usersRoutes from './routes/UsersRoute'
import authRoutes from './routes/AuthRouter'
import mongoose from "mongoose";


mongoose.connect(process.env.MONGO_UR!)

import passport from "./config/passport";

app.use(passport.initialize())
app.use('/appFinance/auth', authRoutes)
app.use('/appFinance/movements', movementsRoutes)
app.use('/appFinance/users', usersRoutes)


const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

export default app
