import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getuserForSideBar, sendMessage } from "../controllers/message.controller.js";


const router = express.Router()

router.get("/user",protectRoute,getuserForSideBar) 

router.get("/:id",protectRoute, getMessages)

router.get("/send/:id",protectRoute, sendMessage)

export default router;