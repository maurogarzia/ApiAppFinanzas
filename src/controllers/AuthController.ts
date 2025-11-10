import {Request, Response} from 'express'
import {generateJwtToken} from '@/services/AuthService'
import { UserService } from '@/services/UserService'

//-------------------------------------------------------------------------------------------------------------------
// Expone los metodos como register y login y el callback de google
// En googleCallback recibe el req.user que puso Passport y genera/retorna el token
//-------------------------------------------------------------------------------------------------------------------


export class AuthController {

    static async googleCallback(req : Request, res: Response){
        try {
            const user = req.user as any
            const token = generateJwtToken(user)
            
            const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
            res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
        } catch (error : any) {
            res.status(500).json({messgae: error.message})
        }
    }
}