import express from "express";
import { addRating } from "../controllers/ratingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { fileUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/add_rating", authMiddleware, addRating);

export default router;
