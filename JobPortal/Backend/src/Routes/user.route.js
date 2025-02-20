import express from "express";
import { Login, Logout, Signup, updateProfile } from "../Controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()


router.post('/signup',Signup)
router.post('/login',Login)
router.post('/logout',Logout)
router.put('/update-profile',protectRoute,updateProfile)

export default router