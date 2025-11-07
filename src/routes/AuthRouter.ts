
import { AuthController } from "@/controllers/AuthController";
import { Router } from "express";
import passport from "passport";

const router = Router()

// Google
router.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', {session: false}), AuthController.googleCallback)



export default router