import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

const app : Application = express()

dotenv.config()

app.use(cors({
    origin: [`${process.env.FRONTEND_URL}` , "http://localhost:5173"], 
    credentials: true, 
}))
app.use(express.json())
app.use(morgan('dev'))

export default app