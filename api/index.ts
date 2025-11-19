import serverless from "serverless-http";
import app from "../src/app";
import { connectDB } from "../src/config/db";

// Ejecuta conexión antes de handling requests
connectDB();

export default serverless(app);
