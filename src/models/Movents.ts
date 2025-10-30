import { IMovents } from "@/types/IMovents";
import { Schema } from "mongoose";

export const moventSchema = new Schema<IMovents>({
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
},{
    timestamps: true, // Crea los campos de createdAt y updatedAt
    toJSON: {
        virtuals: true, // campos virtuales (a futuro)
        versionKey: false, // campo de version que no debe aparecer en el json (por eso es false)
        transform: (_, ret) => { // funcion para recibir en el front el id como string, mientras que en la bd se guarda como ObjectId
            ret.id = ret._id.toString()
            delete ret.id
        }
    }
})