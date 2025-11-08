import { UsersControllers } from "@/controllers/UsersControllers";
import { Router } from "express";


const route = Router()

route.get('/', UsersControllers.getAll)
route.get('/:id', UsersControllers.getById)
route.delete('/:id', UsersControllers.delete)

export default route