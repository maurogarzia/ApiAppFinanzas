import app from "./server/server";
import movementsRoutes from '../src/routes/MovementRoute'
import usersRoutes from '../src/routes/UsersRoute'
import authRoutes from '../src/routes/AuthRouter'
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
