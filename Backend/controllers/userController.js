import { updateUserRole } from "../services/userService.js";
import {
  updateProfile,
  changePassword,
} from "../services/userService.js";
import { createAuditLog } from "../services/auditService.js";
import UserModel from "../models/userModel.js";

export const updateUserRoleHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await updateUserRole(
      id,
      role,
      req.user.id
    );
    await createAuditLog({
     action: "USER_ROLE_UPDATED",
     user: req.user,
     resourceType: "User",
     resourceId: updatedUser._id,
     metadata: { newRole: updatedUser.role },
    });

    res.json({
      message: "User role updated successfully",
      data: {
        id: updatedUser._id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProfileHandler = async (req, res) => {
  try {
    const updatedUser = await updateProfile(
      req.user.id,
      req.body
    );

    res.json({
      message: "Profile updated successfully",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        age:updatedUser.age
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const changePasswordHandler = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");

    res.status(200).json(user);

  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};