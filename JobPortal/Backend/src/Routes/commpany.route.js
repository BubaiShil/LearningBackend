import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCompany, getCompanybyID, Register, updateCompany } from "../Controller/company.controller.js";

const router = express.Router()


router.post('/register',protectRoute,Register)
router.get('/get',protectRoute,getCompany)
router.get('/get/:id',protectRoute,getCompanybyID)
router.put('/update-company/:id',protectRoute,updateCompany)

export default router