import { Movement } from "@/models/Movements";
import { User } from "@/models/Users";
import { IMovements } from "@/types/IMovements";
import { UserRepository } from "./UserRepository";

export class MovementsRepository {
    
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

    // Traigo los movimientos del usuario
    async findMovementsByUser(userId: string) : Promise<IMovements[] | null>{
        return Movement.find({user: userId})
    }

    // Traigo los movimientos del usuario pero del mes actual
    async findMovementsOfCurrentMonth(userId: string): Promise<IMovements[]> {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Primer dia del mes
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // Ultimo dia del mes

        return Movement.find({
            user: userId,
            date: { $gte: startOfMonth, $lte: endOfMonth },
        });
    }

    // Filtro por tipo
    async findByType(userId : string, type: string) : Promise<IMovements[] | null> {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Primer dia del mes
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // Ultimo dia del mes
        return Movement.find({
            user: userId, 
            type,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({date: -1})
    }

    // Filtro por fecha mas reciente
    async findByMoreRecent(userId: string) : Promise<IMovements[] | null>{
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Primer dia del mes
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // Ultimo dia del mes
        return Movement.find({
            user: userId,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({date: -1})
    }

    // Filtro por fecha mas antigua
    async findByMoreAncent(userId: string) : Promise<IMovements[] | null>{
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Primer dia del mes
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // Ultimo dia del mes

        return Movement.find({
            user: userId,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({date: 1})
    }
    
    async findByDate(userId: string, year: number,  month: number) : Promise<IMovements[] | null>{

        const jsMonth = month - 1

        const startOfMonth = new Date(year, jsMonth, 1) // Primer dia del mes
        const endOfMonth = new Date(year, jsMonth + 1, 0, 23, 59, 59, 999) // Ultimo dia del mes
        return Movement.find({
            user: userId,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({date: 1})
    }
}
