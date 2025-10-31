import { UsersControllers } from "@/controllers/UsersControllers";
import { Router } from "express";


const route = Router()

route.get('/', UsersControllers.getAll)
route.get('/:id', UsersControllers.getById)
route.post('/', UsersControllers.create)
route.put('/:id', UsersControllers.update)
route.delete('/:id', UsersControllers.delete)