import express from "express";
import { getAdminAnalyticsHandler, getEmailLogsHandler, getUsersHandler } from "../controllers/adminController.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { getAuditLogsHandler } from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/analytics",
  authMiddleware,
  authorizeRoles("admin",'technician'),
  getAdminAnalyticsHandler
);
router.get(
  "/email-logs",
  authMiddleware,
  authorizeRoles("admin"),
  getEmailLogsHandler
);
router.get(
  "/audit-logs",
  authMiddleware,
  authorizeRoles("admin"),
  getAuditLogsHandler
);
router.get(
  "/users",
  authMiddleware,
  authorizeRoles("admin"),
  getUsersHandler
);

export default router;