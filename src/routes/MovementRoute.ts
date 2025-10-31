import { MovementController } from '@/controllers/MovementsController'
import { Router } from 'express'


const route = Router()

route.get('/', MovementController.getAll)
route.get('/:id', MovementController.getById)
route.post('/', MovementController.create)
route.put('/:id', MovementController.update)
route.delete('/:id', MovementController.delete)

