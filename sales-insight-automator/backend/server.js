require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const analyzeRoute = require("./routes/analyzeRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ────────────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(express.json());

// Global rate limiter: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: "error", message: "Too many requests. Please try again later." },
});
app.use(limiter);

// ─── Swagger Docs ───────────────────────────────────────────────────────────
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "Sales Insight Automator – API Docs",
}));

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use("/", analyzeRoute);

// ─── Health Check ───────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "sales-insight-automator-backend", timestamp: new Date().toISOString() });
});

// ─── 404 Handler ────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ status: "error", message: "Route not found." });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[Error]", err.message);
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ status: "error", message: "File too large. Max size is 10MB." });
  }
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({ status: "error", message: "Unexpected file field." });
  }
  res.status(500).json({ status: "error", message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`\n🚀  Sales Insight Automator Backend`);
  console.log(`   Server  : http://localhost:${PORT}`);
  console.log(`   Swagger : http://localhost:${PORT}/docs`);
  console.log(`   Health  : http://localhost:${PORT}/health\n`);
});

module.exports = app;
