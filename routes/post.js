import express from "express";
import {
  addPost,
  getPostById,
  updatePost,
  deletePost,
  getAllPostsOfUser,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { fileUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/add_post",
  authMiddleware,
  upload.single("post_img"),
  fileUpload,
  addPost
);
router.get("/single_post/:_id", authMiddleware, getPostById);
router.put(
  "/:_id",
  authMiddleware,
  upload.single("post_img"),
  fileUpload,
  updatePost
);
router.delete("/:_id", authMiddleware, deletePost);
router.get("/get_user_posts/:_id", authMiddleware, getAllPostsOfUser);

export default router;
