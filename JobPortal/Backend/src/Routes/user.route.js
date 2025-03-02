import express from "express";
import { chechAuth, Login, Logout, Signup, updateProfile } from "../Controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import  upload  from "../middleware/multer.middleware.js"; 

const router = express.Router();

router.post("/signup", upload.single("file"), Signup); 
router.post("/login", Login);
router.post("/logout", Logout);
router.put("/update-profile",upload.single("file"), protectRoute, updateProfile);
router.get("/check", protectRoute, chechAuth);

export default router;
