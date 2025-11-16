import { Movement } from "@/models/Movements";
import { User } from "@/models/Users";
import { MovementsRepository } from "@/repositories/MovementsRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { IMovements } from "@/types/IMovements";

export class MovementsService {
    private movementsRepository = new MovementsRepository()
    private userRepository = new UserRepository()

    async getAllMovements() : Promise<IMovements[]>{
        return this.movementsRepository.findAll()
    }

    async getById(id: string): Promise<IMovements | null>{
        const existMovement = await this.movementsRepository.findById(id)
        if (!existMovement){
            throw new Error(`No se encontró el movimiento con id: ${id}`)
        }
        return existMovement
    }

    async getMovementsByUserId(userId: string) : Promise<IMovements[] | null> {
        return this.movementsRepository.findMovementsByUser(userId)
    }

    async userMovementsOfThemonth(userId: string) : Promise<IMovements[] | undefined>{
        return this.movementsRepository.findMovementsOfCurrentMonth(userId)
    }

    async getByType(userId: string, type: string) : Promise<IMovements[] | null>{

        if (type !== 'expense' && type !== 'income') throw new Error('El tipo de movimiento es incorrecto')

        const existUser = await this.userRepository.findById(userId)
        if (!existUser) throw new Error('Usuario no encontrado')

        const movements = await this.movementsRepository.findByType(userId, type)

        if (!movements) throw new Error('No se encontraron movimientos')
        return movements
    }

    async getMoreRecent(userId: string) : Promise<IMovements[] | null>{
        const existUser = await this.userRepository.findById(userId)
        if (!existUser) throw new Error('Usuario no encontrado')

        const movements = await this.movementsRepository.findByMoreRecent(userId)
        if (!movements ) throw new Error('No se encontraron movimientos')

        return movements
    }

    async getMoreAncent(userId: string) : Promise<IMovements[] | null>{
        const existUser = await this.userRepository.findById(userId)
        if (!existUser) throw new Error('Usuario no encontrado')

        const movements = await this.movementsRepository.findByMoreAncent(userId)
        if (!movements) throw new Error('No se encontraron movimientos')

        return movements
    }

    async addMovement(userId: string,  data: Partial<IMovements>): Promise<IMovements>{
        if (data.amount! < 0) throw new Error("El monto debe ser mayor a 0")
        
        if (!data.amount || !data.description || !data.date || !data.type) throw new Error('Deben existir todos los campos')

        const existUser = await this.userRepository.findById(userId)
        if (!existUser) throw new Error('Usuario no encontrado')

        
        data.user = existUser._id
        
        const newMovent = await this.movementsRepository.create(data)

        await this.userRepository.addMoventToUSer(String(userId), newMovent._id)
        return newMovent
    }

    async updateMovement(data: Partial<IMovements>, id: string) : Promise<IMovements | null>{
        if (data.amount! < 0) throw new Error("El monto debe ser mayor a 0")
        
        // if (!data.amount || !data.description || !data.date || !data.type) throw new Error('Deben existir todos los campos')

        const existMovement = await this.movementsRepository.update(id, data)
        if (!existMovement) throw new Error(`No se encontró el movimiento con id: ${id}`)
        
        return existMovement
    }

    async deleteMovement(id: string): Promise<void>{
        const existMovement = await this.movementsRepository.findById(id)

        if (!existMovement) throw new Error(`No se encontró el movimiento con id: ${id}`)
        
        
        await User.findByIdAndUpdate(existMovement.user, {
            $pull: {movements: id}
        })

        await this.movementsRepository.delete(id)
    }
}