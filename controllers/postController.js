import Post from "../models/Post.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !category) {
    throw new AppError("Title and category are required", 400);
  }

  const imagePaths = req.fileUrls || [];

  if (imagePaths.length > 3) {
    throw new AppError("You can upload a maximum of 3 images", 400);
  }

  const post = await Post.create({
    title,
    content,
    category,
    images: imagePaths,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "-password");

  const totalPosts = await Post.countDocuments();

  res.status(200).json({
    count: posts.length,
    total: totalPosts,
    page,
    totalPages: Math.ceil(totalPosts / limit),
    posts,
  });
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "user",
    "-password -__v"
  );

  if (!post) throw new AppError("Post not found", 404);

  res.status(200).json({ post });
});

export const updatePost = asyncHandler(async (req, res) => {
  const updates = req.body;

  if (req.files) {
    const imagePaths = req.fileUrls || [];

    if (imagePaths.length > 3) {
      throw new AppError("You can upload a maximum of 3 images", 400);
    }

    updates.images = imagePaths;
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updatedPost) throw new AppError("Post not found", 404);

  res.status(200).json({
    message: "Post updated successfully",
    post: updatedPost,
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) throw new AppError("Post not found", 404);

  res.status(200).json({
    message: "Post deleted successfully",
  });
});

// Get all posts of a specific user
export const getAllPostsOfUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
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
