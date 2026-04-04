import express from "express";
import {
  createReportHandler,
  updateResultsHandler,
  getReportsHandler,
  getReportDownloadUrl,
  getMyReportsHandler
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

router.get(
  "/:id/download",
  authMiddleware,
  authorizeRoles("admin", "technician", "patient"),
  getReportDownloadUrl
);

router.get(
  "/my",
  authMiddleware,
  authorizeRoles("patient"),
  getMyReportsHandler
);

export default router;