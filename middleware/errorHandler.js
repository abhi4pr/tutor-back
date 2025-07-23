export default function errorHandler(err, req, res, next) {
  console.error("🔥 Global Error:", err);

  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production" && status === 500
      ? "Something went wrong!"
      : err.message;

  res.status(status).json({ error: message });
}
