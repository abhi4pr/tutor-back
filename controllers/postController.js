import Post from "../models/Post.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addPost = asyncHandler(async (req, res) => {
  const { title, content, category, user, fees, center_address, timings } =
    req.body;

  if (
    !title ||
    !content ||
    !category ||
    !user ||
    !fees ||
    !center_address ||
    !timings
  ) {
    throw new AppError(
      "Title, Content, category, user, fees, center address and timings are required",
      400
    );
  }

  const imagePath = req.fileUrl || "";

  const post = await Post.create({
    title,
    content,
    category,
    post_img: imagePath,
    user,
    fees,
    center_address,
    timings,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params._id).populate(
    "user",
    "-password"
  );

  if (!post) throw new AppError("Post not found", 404);

  res.status(200).json({ message: "Post retrieved successfully", post });
});

export const updatePost = asyncHandler(async (req, res) => {
  const updates = req.body;

  if (req.file) {
    updates.post_img = req.fileUrl;
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params._id,
    { $set: updates },
    { new: true }
  );

  if (!updatedPost) throw new AppError("Post not found", 404);

  res.status(200).json({
    message: "Post updated successfully",
    post: updatedPost,
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params._id);

  if (!post) throw new AppError("Post not found", 404);

  res.status(200).json({
    message: "Post deleted successfully",
  });
});

export const getAllPostsOfUser = asyncHandler(async (req, res) => {
  const userId = req.params._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "-password");

  const totalPosts = await Post.countDocuments({ user: userId });

  res.status(200).json({
    count: posts.length,
    total: totalPosts,
    page,
    totalPages: Math.ceil(totalPosts / limit),
    posts,
  });
});
