import { Movement } from "@/models/Movements";
import { User } from "@/models/Users";
import { IMovements } from "@/types/IMovements";
import { UserRepository } from "./UserRepository";

export class MoventsRepository {
    
    userRespository = new UserRepository()

    async findAll() : Promise<IMovements[]>{
        return Movement.find()
    }

    async findById(id: string) : Promise<IMovements | null>{
        return Movement.findById(id)
    }

    async create(newEntity: Partial<IMovements>): Promise<IMovements> {
        const movement = new Movement(newEntity)
        return movement.save()
    }

    async update(id: string, updateEntity: Partial<IMovements>): Promise<IMovements | null>{
        return Movement.findByIdAndUpdate(id, updateEntity, {new : true})
    }

    async delete(id: string): Promise<void>{
        await Movement.findByIdAndDelete(id)
    }

    // Filtro por tipo
    async findByType(userId : string, type: string) : Promise<IMovements[] | null> {
        return Movement.find({user: userId, type}).sort({date: -1})
    }

    // Filtro por fecha mas reciente
    async findByMoreRecent(userId: string) : Promise<IMovements[] | null>{
        return Movement.find({user: userId}).sort({date: -1})
    }

    // Filtro por fecha mas antigua
    async findByMoreAncent(userId: string) : Promise<IMovements[] | null>{
        return Movement.find({user: userId}).sort({date: 1})
    }
}
