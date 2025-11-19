import { User } from "../models/Users";
import { IUsers } from "../types/IUsers";
import { Types } from "mongoose";

export class UserRepository{
    async findAll(): Promise<IUsers[]>{
        return User.find()
    }

    async findById(id: string): Promise<IUsers | null>{
        return User.findById(id)
    }

    async findByEmail(email: string) : Promise<IUsers | null>{
        return User.findOne({email}).select('+password')
    }

    async findByGoogleId(googleId: string): Promise<IUsers | null>{
        return User.findOne({googleId})
    }

    async create(data: IUsers): Promise<IUsers>{
        const newUser = new User(data)
        return newUser.save()
    }

    async addMoventToUSer(userId : string, movementId: Types.ObjectId){
        await User.findByIdAndUpdate(userId, {
            $push: {movements: movementId}
        })
    }

    async delete(id: string) : Promise<void>{
        await User.findByIdAndDelete(id)
    }
}