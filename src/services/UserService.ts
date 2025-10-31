import { UserRepository } from "@/repositories/UserRepository";
import { IUsers } from "@/types/IUsers";

export class UserService {
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

    async create(data: IUsers): Promise<IUsers>{
        if (!data.fullName || !data.email || !data.password) throw new Error('Todos los campos deben completarse')
        return this.userRepository.create(data)
    }

    async update(data: IUsers, id: string): Promise<IUsers | null>{
        if (!data.fullName || !data.email || !data.password) throw new Error('Todos los campos deben completarse')

        const existUsers = await this.userRepository.findById(id)
        if (!existUsers){
            throw new Error(`No se encontró el usuario con id: ${id}`)
        }
        return existUsers
    }

    async delete(id: string): Promise<void>{
        const existUsers = await this.userRepository.delete(id)
        if (existUsers === null){
            throw new Error(`No se encontró el usuario con id: ${id}`)
        }
        
    }
}