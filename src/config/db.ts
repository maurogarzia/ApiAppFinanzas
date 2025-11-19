import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    if (isConnected) return;

    const conn = await mongoose.connect(process.env.MONGO_URL!);
    isConnected = Boolean(conn.connections[0].readyState);

    console.log("Mongo conectado");
}
