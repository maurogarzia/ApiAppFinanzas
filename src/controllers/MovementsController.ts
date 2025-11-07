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

    static async getByType(req: Request, res: Response) {
        try {
            const data = await movementsService.getByType(req.params.id, req.params.type)
            res.status(200).json(data)
        } catch (error: any) {
            const status = error.message.includes('no encontrado') ? 404 : 400
            res.status(status).json({message : error.message})
        }
    }

    static async getByMoreAncent (req: Request, res: Response) {
        try {
            const data = await movementsService.getMoreAncent(req.params.id)
            res.status(200).json(data)
        } catch (error: any) {
            const status = error.message.includes('no encontrado') ? 404 : 400
            res.status(status).json({message: error.message})
        }
    }

    static async getByMoreRecent(req: Request, res: Response) {
        try {
            const data = await movementsService.getMoreRecent(req.params.id)
            res.status(200).json(data)
        } catch (error: any) {
            const status = error.message.includes('no encontrado') ? 404 : 400
            res.status(status).json({message: error.message})
        }
    }

    static async create(req: Request, res: Response){
        try {
            const {userId: userId} = req.params
            const newMovements = await movementsService.addMovement(userId, req.body)
            
            res.status(201).json(newMovements)
        } catch (error : any) {
            res.status(400).json({message : error.message})
        }
    }

    static async update(req: Request, res: Response){
        try{
            const updatedMovements = await movementsService.updateMovement(req.body, req.params.id  )
            res.status(200).json(updatedMovements)
        }catch(error: any){
            const status = error.message.includes('no encontrado') ? 404 : 400
            res.status(status).json({message: error.message})
        }
    }

    static async delete(req: Request, res: Response){
        try {
            await movementsService.deleteMovement(req.params.id, req.params.userId)
            res.json('Movimiento eliminado')
        } catch (error : any) {
            res.status(400).json({message: error.message})
        }
    }   
}