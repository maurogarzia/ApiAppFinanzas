import { IMovements } from "../types/IMovements";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const movementsSchema = new Schema<IMovements>({
    date: {
        type: Date,
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

export const Movement = mongoose.model<IMovements>("Movement", movementsSchema)