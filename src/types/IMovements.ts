import { Types } from "mongoose"
import { IUsers } from "./IUsers"

export interface IMovements extends Document{
    _id: Types.ObjectId // Id real de mongo
    id?: string // Id que se devuelve en el front
    date: Date,
    description: string,
    type: "income" | "expense",
    amount: number,
    user: IUsers
}