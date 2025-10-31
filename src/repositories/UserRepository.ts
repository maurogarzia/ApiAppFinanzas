import { User } from "@/models/Users";
import { IUsers } from "@/types/IUsers";

export class UserRepository{
    async findAll(): Promise<IUsers[]>{
        return User.find()
    }

    async findById(id: string): Promise<IUsers | null>{
        return User.findById(id)
    }

    async create(data: IUsers): Promise<IUsers>{
        const newUser = new User(data)
        return newUser.save()
    }

    async update(data: IUsers, id: string) : Promise<IUsers | null>{
        return User.findByIdAndUpdate(id, data, {new: true})
    }

    async delete(id: string) : Promise<void>{
        User.findByIdAndDelete(id)
    }
}