import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app : Application = express()


app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true, 
}))
app.use(express.json())
app.use(morgan('dev'))

export default app