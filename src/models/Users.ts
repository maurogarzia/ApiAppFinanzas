import { IUsers } from "@/types/IUsers";
import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema<IUsers>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
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