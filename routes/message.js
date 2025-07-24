import express from "express";
import { chats } from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/chats/:userid/:otheruserid", chats);

export default router;
