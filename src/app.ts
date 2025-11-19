import app from "./server/server";
import movementsRoutes from '../src/routes/MovementRoute'
import usersRoutes from '../src/routes/UsersRoute'
import authRoutes from '../src/routes/AuthRouter'

app.use('/appFinance/auth', authRoutes)
app.use('/appFinance/movements', movementsRoutes)
app.use('/appFinance/users', usersRoutes)


export default app
