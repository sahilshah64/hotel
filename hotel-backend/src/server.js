require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const morgan     = require("morgan");
const rateLimit  = require("express-rate-limit");
const connectDB  = require("./config/db");

// ── Routes ────────────────────────────────────────────
const authRoutes     = require("./routes/auth");
const roomRoutes     = require("./routes/rooms");
const bookingRoutes  = require("./routes/bookings");
const contactRoutes  = require("./routes/contact");

// ── DB ────────────────────────────────────────────────
connectDB();

const app = express();

// ── CORS ──────────────────────────────────────────────
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// ── Rate limiting ─────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // tighter limit on auth endpoints
  message: { error: "Too many attempts. Please try again later." },
});

app.use(limiter);

// ── Core middleware ───────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

// ── Health check ──────────────────────────────────────
app.get("/api/health", (_, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

// ── API routes ────────────────────────────────────────
app.use("/api/auth",     authLimiter, authRoutes);
app.use("/api/rooms",    roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact",  contactRoutes);

// ── 404 ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
});

// ── Global error handler ──────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: process.env.NODE_ENV === "production"
      ? "Something went wrong."
      : err.message,
  });
});

// ── Start ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀  Server running on http://localhost:${PORT}`)
);

module.exports = app;
