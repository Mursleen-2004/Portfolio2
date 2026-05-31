// Portfolio Backend – server.js
// ES module entry point

import express from "express";
import cors from "cors";
import "dotenv/config";
import rateLimit from "express-rate-limit";

import aiRouter from "./routes/ai.js";
import contactRouter from "./routes/contact.js";

// ─────────────────────────────────────────────────────────────────────────────
// App Setup
// ─────────────────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────────────────────────────────────
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ─────────────────────────────────────────────────────────────────────────────
// Body Parser
// ─────────────────────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ─────────────────────────────────────────────────────────────────────────────
// Global Rate Limiter – 100 requests per 15 minutes per IP
// ─────────────────────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});
app.use(globalLimiter);

// ─────────────────────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────────────────────
app.use("/api/ai", aiRouter);
app.use("/api/contact", contactRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

// ─────────────────────────────────────────────────────────────────────────────
// Global Error Handling Middleware
// ─────────────────────────────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred."
      : err.message || "An unexpected error occurred.";

  console.error(`[ERROR ${status}]`, err.message);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(status).json({ success: false, error: message });
});

// ─────────────────────────────────────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Portfolio Backend running on port ${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health`);
  console.log(`  AI:     http://localhost:${PORT}/api/ai/chat`);
  console.log(`  Mail:   http://localhost:${PORT}/api/contact/send`);
});

export default app;
