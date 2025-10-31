import { MovementsService } from "@/services/MovementsService"
import { log } from "console"
import {Request, Response} from 'express'

const movementsService = new MovementsService()

export class MovementController {
    static async getAll(req: Request, res: Response){
        const data = await movementsService.getAllMovements()
        res.json(data)
    }

    static async getById(req: Request, res: Response) {
        try {
            const data = await movementsService.getById(req.params.id)
            res.json(data)
        } catch (error : any) {
            res.status(404).json({message: error.message})
        }
    }

    static async create(req: Request, res: Response){
        try {
            const newMovements = await movementsService.addMovement(req.body)
            
            res.status(201).json(newMovements)
        } catch (error : any) {
            res.status(400).json({message : error.message})
        }
    }

    static async update(req: Request, res: Response){
        try{
            const updatedMovements = await movementsService.updateMovement( req.params.id, req.body)
            res.status(200).json(updatedMovements)
        }catch(error: any){
            const status = error.message.includes('no encontrado') ? 404 : 400
            res.status(status).json({message: error.message})
        }
    }

    static async delete(req: Request, res: Response){
        try {
            await movementsService.deleteMovement(req.params.id)
            res.json('Movimiento eliminado')
        } catch (error : any) {
            res.status(400).json({message: error.message})
        }
    }   
}