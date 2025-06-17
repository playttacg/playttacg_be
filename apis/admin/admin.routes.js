import express from "express";
import { adminLogin, adminSignup , getAllAdmins } from "./admin.controllers.js";
const router = express.Router();

router.get('/all-admins' , getAllAdmins);
router.post('/signup', adminSignup);
router.post('/login', adminLogin);

export default router;