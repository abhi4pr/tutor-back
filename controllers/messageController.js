import Message from "../models/Message.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const chats = asyncHandler(async (req, res) => {
  const { userid, otheruserid } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: userid, receiver: otheruserid },
      { sender: otheruserid, receiver: userid },
    ],
  }).sort("createdAt");

  res.status(200).json({ message: "Post retrieved successfully", messages });
});
