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
