import {Response} from 'express'
import {generateJwtToken} from '../services/AuthService'



//-------------------------------------------------------------------------------------------------------------------
// Expone el metodo callback de google
// En googleCallback recibe el req.user que puso Passport y genera/retorna el token
//-------------------------------------------------------------------------------------------------------------------


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
            return res.redirect(`http://localhost:5173/login-success?token=${token}`);
            
        }catch(error : any){
            res.status(500).json(error.message)
        }
    }
}