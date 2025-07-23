import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({ user });
});

export const updateUser = asyncHandler(async (req, res) => {
  const bodyData = req.body;
  const { error } = updateUserSchema.validate(bodyData);
  if (error) throw new AppError(error.details[0].message, 400);

  const userId = req.user.id;
  const updates = {};

  if (bodyData.name) updates.name = bodyData.name;
  if (bodyData.email) updates.email = bodyData.email;
  if (bodyData.password) {
    const hashedPassword = await argon2.hash(bodyData.password);
    updates.password = hashedPassword;
  }

  if (req.file) {
    const imagePath = req.fileUrl;
    updates.profileImage = imagePath;
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

export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
  const skip = (page - 1) * limit;

  const users = await User.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.find().select("-password");

  res.status(200).json({
    count: users.length,
    total: totalUsers,
    page,
    totalPages: Math.ceil(totalUsers / limit),
    users,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({
    message: "User deleted successfully",
  });
});
