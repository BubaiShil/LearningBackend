import express from "express";
import { chechAuth, Login, Logout, Signup, updateProfile } from "../Controller/user.controller.js";
//import { protectRoute } from "../middleware/auth.middleware.js";
import { uploadImage, uploadResume } from '../middleware/multer.middleware.js'; // Adjust path as needed
import { protectRoute } from '../middleware/auth.middleware.js'; // Assuming your auth middleware path

const router = express.Router();

// For Signup (now uses uploadImage for profile picture)
router.post("/signup", uploadImage.single("file"), Signup); 

// Standard Login and Logout
router.post("/login", Login);
router.post("/logout", Logout);

// For Update Profile (now uses uploadResume for the resume PDF)
// The field name "file" must match what your frontend sends for the resume.
router.put("/update-profile", uploadResume.single("file"), protectRoute, updateProfile);

// Existing check route
router.get("/check", protectRoute, chechAuth);

export default router;
