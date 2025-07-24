import Message from "../models/Message.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const chats = asyncHandler(async (req, res) => {
  const { userid, otheruserid } = req.params;

  const messages = await Message.find({
    $or: [
      {
        sender: new mongoose.Types.ObjectId(userid),
        receiver: new mongoose.Types.ObjectId(otheruserid),
      },
      {
        sender: new mongoose.Types.ObjectId(otheruserid),
        receiver: new mongoose.Types.ObjectId(userid),
      },
    ],
  }).sort("createdAt");

  res.status(200).json({ message: "Post retrieved successfully", messages });
});
