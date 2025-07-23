import express from "express";
import {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { fileUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getUserById);
router.put(
  "/update-profile",
  authMiddleware,
  upload.single("profileImage"),
  fileUpload,
  updateUser
);
router.get("/", authMiddleware, getAllUsers);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
