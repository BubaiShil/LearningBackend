import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../Controller/application.controller.js";

const router = express.Router()


router.get('/apply/:id',protectRoute,applyJob)
router.get('/get',protectRoute,getAppliedJobs)
router.get('/:id/applicants',protectRoute,getApplicants)
router.post('/update-status/:id',protectRoute,updateStatus)

export default router