import express from "express";
import {
  createReportHandler,
  updateResultsHandler,
  getReportsHandler
} from "../controllers/reportController.js";
import { validateSchema } from "../middleware/validateMiddleware.js";
import { createReportSchema, updateResultsSchema } from "../validation/reportValidation.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "technician"),
  validateSchema(createReportSchema),
  createReportHandler
);

router.put(
  "/:id/results",
  authMiddleware,
  authorizeRoles("technician"),
  validateSchema(updateResultsSchema),
  updateResultsHandler
);
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "technician"),
  getReportsHandler
);

export default router;