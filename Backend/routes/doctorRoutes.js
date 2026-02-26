import { createDoctorHandler,deleteDoctorHandler,updateDoctorHandler,getDoctorsHandler } from "../controllers/doctorController.js";
import express from 'express'
import { createDoctorSchema , updateDoctorSchema } from "../validation/doctorValidation.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { validateSchema } from "../middleware/validateMiddleware.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router =express.Router()

router.post('/',authMiddleware,authorizeRoles('admin'),validateSchema(createDoctorSchema),createDoctorHandler)
router.get('/',rateLimiter,authMiddleware,authorizeRoles('admin','technician'),getDoctorsHandler)
router.put('/:id',authMiddleware,authorizeRoles('admin'),validateSchema(updateDoctorSchema),updateDoctorHandler)
router.delete('/:id',authMiddleware,authorizeRoles('admin'),deleteDoctorHandler)

export default router;