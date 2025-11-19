import { UsersControllers } from "../controllers/UsersControllers";
import { verifyAdmin, verifyToken } from "../services/AuthService";
import { Router } from "express";


const route = Router()

route.get('/',verifyToken, verifyAdmin, UsersControllers.getAll)
route.get('/me', verifyToken, UsersControllers.getUserLogged)
route.get('/:id',verifyToken, UsersControllers.getById)
route.delete('/:id', UsersControllers.delete)

export default route