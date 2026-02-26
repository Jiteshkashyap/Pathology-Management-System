import express from "express";
import {createPackageHandler,getPackagesHandler,updatePackageHandler,deletePackageHandler} from "../controllers/packageController.js";
import { createPackageSchema,updatePackageSchema} from "../validation/packageValidation.js";

import { validateSchema } from "../middleware/validateMiddleware.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { rateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/",authMiddleware,authorizeRoles("admin"),validateSchema(createPackageSchema),createPackageHandler);
router.get("/",rateLimiter,authMiddleware,authorizeRoles("admin", "technician"),getPackagesHandler);
router.put("/:id",authMiddleware,authorizeRoles("admin"),validateSchema(updatePackageSchema),updatePackageHandler);
router.delete("/:id",authMiddleware,authorizeRoles("admin"),deletePackageHandler);

export default router;