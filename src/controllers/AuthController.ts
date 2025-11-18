import {Request, Response} from 'express'
import {generateJwtToken} from '@/services/AuthService'
import { UserService } from '@/services/UserService'

//-------------------------------------------------------------------------------------------------------------------
// Expone el metodo callback de google
// En googleCallback recibe el req.user que puso Passport y genera/retorna el token
//-------------------------------------------------------------------------------------------------------------------


export class AuthController {

    static async googleCallback(req : Request, res: Response){
        try {
            const user = req.user as any
            console.log('Usuario: ', user);
            
            const token = generateJwtToken(user)
            console.log('token', token);
            
            // res.status(200).json({
            //     user, 
            //     token
            // })
            
            const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
            const redirectUrl = `${FRONTEND_URL}/auth/callback?token=${token}`
            console.log('Redirigiendo a: ', redirectUrl);
            
            res.redirect(redirectUrl);
            
            
        } catch (error : any) {
            res.status(500).json({messgae: error.message})
        }
    }
}