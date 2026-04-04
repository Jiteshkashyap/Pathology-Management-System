import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const updateUserRole = async (userId, newRole, currentAdminId) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  //  Prevent admin from removing their own admin role
  if (
    user._id.toString() === currentAdminId &&
    newRole !== "admin"
  ) {
    throw new Error("You cannot remove your own admin role");
  }

  user.role = newRole;
  await user.save();

  return user;
};

export const updateProfile = async (userId, data) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  if (data.name) user.name = data.name;
  if (data.phone) user.phone = data.phone;
  if(data.age) user.age = data.age

  await user.save();

  return user;
};

export const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;

  await user.save();

  return true;
};