import { Movement } from "@/models/Movements";
import { MoventsRepository } from "@/repositories/MovementsRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { IMovements } from "@/types/IMovements";

export class MovementsService {
    private moventsRepository = new MoventsRepository()
    private userRepository = new UserRepository()

    async getAllMovements() : Promise<IMovements[]>{
        return this.moventsRepository.findAll()
    }

    async getById(id: string): Promise<IMovements | null>{
        const existMovement = await this.moventsRepository.findById(id)
        if (!existMovement){
            throw new Error(`No se encontró el movimiento con id: ${id}`)
        }
        return existMovement
    }

    async getByType(userId: string, type: string) : Promise<IMovements[] | null>{

        if (type !== 'expense' && type !== 'income') throw new Error('El tipo de movimiento es incorrecto')

        const existUser = await this.userRepository.findById(userId)
        if (!existUser) throw new Error('Usuario no encontrado')

        const movements = await this.moventsRepository.findByType(userId, type)

        if (!movements || movements.length === 0) throw new Error('No se encontraron movimientos')
        return movements
    }

    async getMoreRecent(userId: string) : Promise<IMovements[] | null>{
        const existUser = await this.userRepository.findById(userId)
        if (!existUser) throw new Error('Usuario no encontrado')

        const movements = await this.moventsRepository.findByMoreRecent(userId)
        if (!movements || movements.length === 0) throw new Error('No se encontraron movimientos')

        return movements
    }

    async getMoreAncent(userId: string) : Promise<IMovements[] | null>{
        const existUser = await this.userRepository.findById(userId)
        if (!existUser) throw new Error('Usuario no encontrado')

        const movements = await this.moventsRepository.findByMoreAncent(userId)
        if (!movements || movements.length === 0) throw new Error('No se encontraron movimientos')

        return movements
    }

    async addMovement(data: Partial<IMovements>): Promise<IMovements>{
        if (data.amount! < 0) throw new Error("El monto debe ser mayor a 0")
        
        if (!data.amount || !data.description || !data.date || !data.type) throw new Error('Deben existir todos los campos')
        
        return this.moventsRepository.create(data)
    }

    async updateMovement(data: Partial<IMovements>, id: string) : Promise<IMovements | null>{
        if (data.amount! < 0) throw new Error("El monto debe ser mayor a 0")
        
        if (!data.amount || !data.description || !data.date || !data.type) throw new Error('Deben existir todos los campos')

        const existMovement = await this.moventsRepository.update(id, data)
        if (!existMovement) throw new Error(`No se encontró el movimiento con id: ${id}`)
        
        return existMovement
    }

    async deleteMovement(id: string): Promise<void>{
        const existMovementAndDelete = await this.moventsRepository.delete(id)
        if (existMovementAndDelete === null) throw new Error(`No se encontró el movimiento con id: ${id}`)
    }
}