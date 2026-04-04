import express from 'express'
import AIHealthModel from '../models/aiHealthModel.js';
import upload from '../middleware/fileMiddleware.js';
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { analyzeHealthReport } from '../controllers/aiController.js';


const router = express.Router()


router.post('/',authMiddleware,authorizeRoles('technician','admin','patient'),upload.single('report'),analyzeHealthReport)


export default router;