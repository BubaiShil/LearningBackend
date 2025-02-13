import express from "express";
import { checkAuth, Login, Logout, Settings, Signup, UpdateProfile } from "../Controllers/auth.controller.js";
import { protectRoutess } from "../Middleware/auth.middleware.js";



const router = express.Router()

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",Logout)
router.post("/settings",Settings)
router.post("/check",protectRoutess,checkAuth)


export default router;
