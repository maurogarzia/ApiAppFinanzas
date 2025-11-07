import { MovementController } from '@/controllers/MovementsController'
import { verifyToken } from '@/services/AuthService'
import { Router } from 'express'


const route = Router()

route.get('/', verifyToken,MovementController.getAll)
route.get('/:id', verifyToken,MovementController.getById)
route.get('/:userId/:type', verifyToken,MovementController.getByType)
route.get('/:userId/recents', verifyToken,MovementController.getByMoreRecent)
route.get('/:userId/ancents',verifyToken, MovementController.getByMoreAncent)    
route.post('/',verifyToken, MovementController.create)
route.put('/:id', verifyToken,MovementController.update)
route.delete('/:id',verifyToken, MovementController.delete)

export default route