import serverless from "serverless-http";
import app from '../src/app'
import { Request, Response } from "express";
import { connectDB } from "../src/config/db";


    const handler = serverless(app);

    export default async function (req: Request, res: Response) {
        await connectDB() // Aseguro la conexion reusando pool
        return handler(req, res)
    }


