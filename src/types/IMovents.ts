import { Types } from "mongoose"

export interface IMovents extends Document{
    _id: Types.ObjectId // Id real de mongo
    id?: string // Id que se devuelve en el front
    date: string,
    description: string,
    type: "income" | "expense",
    amount: number
}