import { UserRepository } from "@/repositories/UserRepository";
import { IUsers } from "@/types/IUsers";
import bcrypt from 'bcrypt'
import { generateJwtToken } from "./AuthService";

export class UserService {
    private userRepository = new UserRepository()

    async registerLocal(data: IUsers) : Promise<{user: IUsers, token: string}> {
        const {fullName, email, password} = data

        if (!fullName || !email || !password) throw new Error('No deben existir campos vacios en el regsitro')
        
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) throw new Error('El email ya se encuentra registrado')

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await this.userRepository.create({
                ...data,
                password: hashPassword,
                provider: 'local'
            }
        )
        const token = generateJwtToken(newUser)
        return {user: newUser, token}
    }

    async loginLocal(email: string, password: string): Promise<{user: IUsers, token: string}>{
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new Error('No se encuentra el usuario con el email ingresado')

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error('Credenciales inválidas')
        
        const token = generateJwtToken(user)
        return {user, token}
    }

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