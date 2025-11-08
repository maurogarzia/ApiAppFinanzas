import { UserService } from "@/services/UserService";
import {Request, Response} from 'express'

const usersService = new UserService()

export class UsersControllers {
    static async getAll(req: Request, res: Response){
        const data = await usersService.getAllUsers()
        res.json(data)
    }

    static async getById(req: Request, res: Response){
        try {
            const data = await usersService.getById(req.params.id)
            res.status(200).json(data)
        } catch (error : any) {
            res.status(404).json({message: error.message})
        }
    }

    static async delete(req: Request, res: Response){
        try {
            await usersService.delete(req.params.id)
            res.json('Se eliminó el usuario')
        } catch (error: any) {
            res.status(400).json({message : error.message})
        }
    }
}