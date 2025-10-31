import dotenv from "dotenv"
import app from "./server/server";
import mongoose from "mongoose";
import movementsRoutes from '@routes/MovementRoute'
import usersRoutes from '@routes/UsersRoute'

dotenv.config()

mongoose.connect(process.env.MONGO_URL!)   
.then(() => {
    console.log('Conectado');
})
.catch((error) => {
    console.log('Ocurrio un error', error);
    
})

app.use('/movements', movementsRoutes)
app.use('/users', usersRoutes)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})