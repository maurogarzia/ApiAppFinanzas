import { Types } from "mongoose"
import { IMovements } from "./IMovements"

export interface IUsers extends Document{
    _id: Types.ObjectId
    id?: string,
    fullName: string,
    email: string,
    password: string,
    googleId: string,
    avatar: string
    provider: 'local' | 'google',
    movements: IMovements[]
}