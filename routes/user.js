import express from "express";
import {
  getUserById,
  updateUser,
  deleteUser,
  updatePassword,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { fileUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/:_id", authMiddleware, getUserById);
router.put(
  "/update_user/:_id",
  authMiddleware,
  upload.single("profile_pic"),
  fileUpload,
  updateUser
);
router.put("/update_password/:_id", authMiddleware, updatePassword);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
