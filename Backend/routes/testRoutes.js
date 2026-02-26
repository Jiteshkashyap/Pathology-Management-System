import { createTestHandler,updateTestHandler,deleteTestHandler,getTestsHandler } from "../controllers/testController.js";
import express from 'express';
import { authMiddleware,authorizeRoles } from "../middleware/authMiddleware.js"; 
import { rateLimiter } from "../middleware/rateLimiter.js";
import { validateSchema } from "../middleware/validateMiddleware.js";
import { createTestSchema,updateTestSchema } from "../validation/testValidation.js";

const router= express.Router()

router.post('/',authMiddleware,authorizeRoles('admin'),validateSchema(createTestSchema),createTestHandler);
router.get('/',rateLimiter,authMiddleware,authorizeRoles('admin','technician'),getTestsHandler);
router.put('/:id',authMiddleware,authorizeRoles('admin'),validateSchema(updateTestSchema),updateTestHandler);
router.delete('/:id',authMiddleware,authorizeRoles('admin'),deleteTestHandler);

export default router;