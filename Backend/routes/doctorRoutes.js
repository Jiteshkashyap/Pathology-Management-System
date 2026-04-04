import { createDoctorHandler,deleteDoctorHandler,updateDoctorHandler,getDoctorsHandler } from "../controllers/doctorController.js";
import express from 'express'
import { createDoctorSchema , updateDoctorSchema } from "../validation/doctorValidation.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { validateSchema } from "../middleware/validateMiddleware.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import upload from "../middleware/fileMiddleware.js";

const router =express.Router()

router.post('/',authMiddleware,authorizeRoles('admin'),upload.single('image'),validateSchema(createDoctorSchema),createDoctorHandler)
router.get('/',rateLimiter,getDoctorsHandler)
router.put('/:id',authMiddleware,authorizeRoles('admin'),upload.single('image'),validateSchema(updateDoctorSchema),updateDoctorHandler)
router.delete('/:id',authMiddleware,authorizeRoles('admin'),deleteDoctorHandler)

export default router;