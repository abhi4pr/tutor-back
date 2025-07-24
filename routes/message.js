import express from "express";
import { chats } from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/chats/:_userid/:_otheruserid", authMiddleware, chats);

export default router;
