import { UserRepository } from "../repositories/UserRepository";
import { IUsers } from "../types/IUsers";
import { MovementsRepository } from "../repositories/MovementsRepository";


export class UserService {
    private movementRepository = new MovementsRepository()
    private userRepository = new UserRepository()

    async getAllUsers(): Promise<IUsers[]> {
        return this.userRepository.findAll()
    }
    
    async getById(id: string) : Promise<IUsers | null>{
        const existUsers = await this.userRepository.findById(id)
        if (!existUsers){
            throw new Error(`No se encontró el usuario con id: ${id}`)
        }
        return existUsers
    }

    async delete(id: string): Promise<void>{
        const existUsers = await this.userRepository.findById(id)
        if (!existUsers) throw new Error(`No se encontró el usuario con id: ${id}`)
        
        await Promise.all(
            existUsers.movements.map((m) => this.movementRepository.delete(String(m._id)))
        )
        await this.userRepository.delete(id)
    }
}