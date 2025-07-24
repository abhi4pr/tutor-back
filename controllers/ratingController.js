import Rating from "../models/Rating.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addRating = asyncHandler(async (req, res) => {
  const { feedback, rating, given_by, given_to } = req.body;

  if (!feedback || !rating || !given_by || !given_to) {
    throw new AppError(
      "Feedback, rating, given to and given by are required",
      400
    );
  }

  const post = await Rating.create({
    feedback,
    rating,
    given_by,
    given_to,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

export const getAllRatingOfUser = asyncHandler(async (req, res) => {
  const userId = req.params._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Rating.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "-password");

  const totalPosts = await Rating.countDocuments({ user: userId });

  res.status(200).json({
    count: posts.length,
    total: totalPosts,
    page,
    totalPages: Math.ceil(totalPosts / limit),
    posts,
  });
});
