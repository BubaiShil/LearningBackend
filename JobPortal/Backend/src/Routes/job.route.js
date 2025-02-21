import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminJobs, getallJobs, getJobByID, JobPost } from "../Controller/job.controller.js";

const router = express.Router()


router.post('/post',protectRoute,JobPost)
router.get('/get',protectRoute,getallJobs)
router.get('/get/:id',protectRoute,getJobByID)
router.get('/adminJobs',protectRoute,adminJobs)

export default router