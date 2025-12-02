import {Response} from 'express'
import {generateJwtToken} from '../services/AuthService'
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/Users';



//-------------------------------------------------------------------------------------------------------------------
// Expone el metodo callback de google
// En googleCallback recibe el req.user que puso Passport y genera/retorna el token
//-------------------------------------------------------------------------------------------------------------------

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthController {


    static googleCallback = async (req: any, res: Response) => {
        try{
            const user = req.user
    
            if (!user) {
                return res.status(404).json({message : 'Usuario no encontrado'})
            }
    
            const token = generateJwtToken(user)
    
            // return res.status(200).json({
            //     user, 
            //     token
            // })

            // Mando el token al front
            return res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
            
        }catch(error : any){
            res.status(500).json(error.message)
        }
    }


    // Controlador para mobile
    static googleMobileLogin = async (req: any, res: Response) => {
        try {
            const {token} = req.body

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID_ANDROID,
            })

            const payload = ticket.getPayload()

            if (!payload) return res.status(401).json({message : 'Token inválido'})
            
            const {name, email, picture, sub} = payload

            let user = await User.findOne({googleId : sub})

            // Si no existe lo crea
            if (!user) {
                user = await User.create({
                    fullName : name,
                    email,
                    googleId: sub,
                    avatar: picture,
                    provider: 'google',
                    role: 'user'
                })
            }

            const jwtToken = generateJwtToken(user)
            res.status(200).json({token: jwtToken})
        } catch (error : any) {
            console.log(error);
            res.status(500).json({message: error.message})
        }
    }
}