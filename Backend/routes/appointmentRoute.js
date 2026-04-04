import express from "express";
import {
  bookAppointmentHandler,
  getAvailableSlotsHandler,
  getMyAppointmentHandler,
  cancelAppointmentHandler,
  getAllAppointmentsHandler,
  updateAppointmentStatusHandler
} from "../controllers/appointmentController.js";

import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { validateSchema } from "../middleware/validateMiddleware.js";
import { bookAppointmentSchema } from "../validation/appointmentValidation.js";

const router = express.Router();

router.get(
  "/available-slots",
  authMiddleware,
  authorizeRoles("patient",'admin','technician'),
  getAvailableSlotsHandler
);

router.post(
  "/book",
  authMiddleware,
  authorizeRoles("patient"),
  validateSchema(bookAppointmentSchema),
  bookAppointmentHandler
);

router.get(
  "/my",
  authMiddleware,
  authorizeRoles("patient"),
  getMyAppointmentHandler
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("patient"),
  cancelAppointmentHandler
);
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "technician"),
  getAllAppointmentsHandler
);

router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles("admin", "technician"),
  updateAppointmentStatusHandler
);
export default router;