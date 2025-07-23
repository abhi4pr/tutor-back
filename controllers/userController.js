import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params._id).select("-password");

  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ message: "user retrieved successfully", user });
});

export const updateUser = asyncHandler(async (req, res) => {
  const bodyData = req.body;

  const userId = req.params._id;
  const updates = {};

  if (bodyData.name) updates.name = bodyData.name;
  if (bodyData.surname) updates.surname = bodyData.surname;
  if (bodyData.address) updates.address = bodyData.address;

  if (req.file) {
    const imagePath = req.fileUrl;
    updates.profile_pic = imagePath;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) throw new AppError("User not found", 404);

  res.status(200).json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({
    message: "User deleted successfully",
  });
});
