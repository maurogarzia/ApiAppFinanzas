
import { AuthController } from "../controllers/AuthController";
import { Router } from "express";


const router = Router()

// Google
router.post('/google', AuthController.loginWithGoogle)


export default router