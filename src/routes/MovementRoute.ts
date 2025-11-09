import { MovementController } from '@/controllers/MovementsController'
import { verifyToken } from '@/services/AuthService'
import { Router } from 'express'

const route = Router()


route.get('/:userId/recents', verifyToken, MovementController.getByMoreRecent)
route.get('/:userId/ancents', verifyToken, MovementController.getByMoreAncent)
route.get('/:userId/type/:type', verifyToken, MovementController.getByType)


route.post('/', verifyToken, MovementController.create)
route.get('/', verifyToken, MovementController.getAll)
route.get('/:id', verifyToken, MovementController.getById)
route.put('/:id', verifyToken, MovementController.update)
route.delete('/:userId/movement/:id', verifyToken, MovementController.delete)

export default route
