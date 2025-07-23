import express from "express";
import {
  signup,
  login,
  forgotPassword,
  verifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify_email", verifyEmail);
router.post("/login", login);
router.post("/forget_password", forgotPassword);

export default router;
