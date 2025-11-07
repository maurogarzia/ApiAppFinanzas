import { IUsers } from "@/types/IUsers";
import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema<IUsers>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String, 
        unique: true,
        sparse: true
    },
    avatar: {
        type: String
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    movements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movement'
    }]
},{
    timestamps: true,
    toJSON: {
        versionKey: false,
        transform: (_,ret) => {
            ret.id = ret._id.toString()
            delete ret.id
        }
    }
})

export const User = mongoose.model<IUsers>('User', usersSchema)