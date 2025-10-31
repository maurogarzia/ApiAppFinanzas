import { Movement } from "@/models/Movements";
import { IMovements } from "@/types/IMovements";

export class MoventsRepository {
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
}
