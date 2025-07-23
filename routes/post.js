import express from "express";
import {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { fileUploads } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/add-post",
  authMiddleware,
  upload.array("images", 3),
  fileUploads,
  addPost
);
router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getPostById);
router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 3),
  fileUploads,
  updatePost
);
router.delete("/:id", authMiddleware, deletePost);

export default router;
