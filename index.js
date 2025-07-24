import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import ratingRoutes from "./routes/rating.js";
import messageRoutes from "./routes/message.js";
import Message from "./models/Message.js";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerConfig.js";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// 3 lines fo code for socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
app.set("io", io);

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 59 * 60 * 1000,
    max: 300,
  })
);

// for image uploading
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/messages", messageRoutes);

// Socket io
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Join user to their own room
  socket.on("join", ({ userId }) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Handle sending messages
  socket.on("send-message", async ({ senderId, receiverId, content }) => {
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
    });
    await message.save();

    // Emit to receiver and sender
    io.to(receiverId).emit("receive-message", message);
    io.to(senderId).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});

// to check if api's running or not
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Tutor Center Backend Api's is Running" });
});

// Error Handler
app.use(errorHandler);

// Global Node process handlers
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully 🚀");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
