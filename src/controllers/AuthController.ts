import {Request, Response} from 'express'
import {generateJwtToken, verifyGoogleToken} from '../services/AuthService'
import { User } from '../models/Users'


//-------------------------------------------------------------------------------------------------------------------
// Expone el metodo callback de google
// En googleCallback recibe el req.user que puso Passport y genera/retorna el token
//-------------------------------------------------------------------------------------------------------------------


export class AuthController {

    static loginWithGoogle = async(req: Request, res: Response) => {
        try {
            const { token } = req.body
            if (!token) return res.status(400).json({message: 'Token requerido'})

            // Verificacion con google
            const googleUser = await verifyGoogleToken(token)

            if (!googleUser?.email) {
                return res.status(400).json({
                    message: "Google no devolvió email, no se puede continuar",
                });
            }

            // Busco el usuario por email
            let user = await User.findOne({email: googleUser?.email})

            // Si no existe lo crea
            if (!user){
                user = await User.create({
                    fullName: googleUser?.name,
                    email: googleUser?.email,
                    avatar: googleUser?.picture,
                    googleId: googleUser?.sub,
                    provider: 'google',
                    role: 'user'
                })
            }

            // Genero jwt propio
            const appToken = generateJwtToken(user)

            res.status(200).json({user, token: appToken})
        } catch (error) {
            console.log(error);
            res.status(500).json({message : 'Error al iniciar sesión'})
        }
    }
}