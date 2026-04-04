import express from "express";
import { updateUserRoleHandler } from "../controllers/userController.js";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware.js";
import { validateSchema } from "../middleware/validateMiddleware.js";
import { updateRoleSchema } from "../validation/userValidation.js";
import {
  updateProfileHandler,
  changePasswordHandler,
  getMe
} from "../controllers/userController.js";

import {
  updateProfileSchema,
  changePasswordSchema,
} from "../validation/userValidation.js";

const router = express.Router();

router.patch(
  "/:id/role",
  authMiddleware,
  authorizeRoles("admin"),
  validateSchema(updateRoleSchema),
  updateUserRoleHandler
);

router.patch(
  "/me",
  authMiddleware,
  validateSchema(updateProfileSchema),
  updateProfileHandler
);

router.patch(
  "/me/password",
  authMiddleware,
  validateSchema(changePasswordSchema),
  changePasswordHandler
);
router.get(
  "/me",
  authMiddleware,
  getMe
)

export default router;