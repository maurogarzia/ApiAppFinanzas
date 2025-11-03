import {Request, Response} from 'express'
import {generateJwtToken} from '@/services/AuthService'
import { UserService } from '@/services/UserService'

const userService = new UserService()

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const {user, token} = await userService.registerLocal(req.body)
            res.status(200).json({message: 'Usuario registrado correctamente', user, token})
        } catch (error : any) {
            res.status(400).json({message: error.message})
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body
            const {user, token} = await userService.loginLocal(email, password)
            res.status(200).json({message : 'Login exitoso', user, token})
        } catch (error : any) {
            res.status(400).json({message : error.message})
        }
    }

    static async googleCallback(req : Request, res: Response){
        try {
            const user = req.user as any
            const token = generateJwtToken(user)
            res.json({message: 'Login con google exitoso', user, token})
        } catch (error : any) {
            res.status(500).json({messgae: error.message})
        }
    }
}