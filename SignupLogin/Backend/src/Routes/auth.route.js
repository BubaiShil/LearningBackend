import express from "express";
import { Login, Logout, Settings, Signup, UpdateProfile } from "../Controllers/auth.controller.js";



const router = express.Router()

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",Logout)
router.post("/settings",Settings)
router.post("/profileUpdate",UpdateProfile)


export default router;
