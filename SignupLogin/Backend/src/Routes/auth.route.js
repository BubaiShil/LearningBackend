import express from "express";
import { checkAuth, Login, Logout, Settings, Signup } from "../Controllers/auth.controller.js";
import { protectRoutess } from "../Middleware/auth.middleware.js";



const router = express.Router()

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",Logout)
router.post("/settings",Settings)
router.get("/check",protectRoutess,checkAuth)


export default router;
