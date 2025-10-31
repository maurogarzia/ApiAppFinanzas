import { Types } from "mongoose"

export interface IUsers extends Document{
    _id: Types.ObjectId
    id?: string,
    fullName: string,
    email: string,
    password: string
}