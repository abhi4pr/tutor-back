import express from "express";
import {
  addRating,
  getAllRatingOfUser,
} from "../controllers/ratingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { fileUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/add_rating", authMiddleware, addRating);
router.get("/get_teacher_feedbacks/:_id", authMiddleware, getAllRatingOfUser);

export default router;
