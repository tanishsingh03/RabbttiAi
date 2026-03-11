const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { analyzeValidationRules, handleValidationErrors } = require("../middleware/validate");
const { handleAnalyze } = require("../controllers/analyzeController");

/**
 * @openapi
 * /analyze:
 *   post:
 *     summary: Submit a sales data file for AI-powered analysis
 *     description: >
 *       Upload a `.csv` or `.xlsx` file along with an email address.
 *       The backend will parse the file, run AI analysis, and email the results.
 *
 *       **⚠️ Prototype Notice:** In this scaffold the endpoint returns a
 *       placeholder response. File parsing, AI inference, and email delivery
 *       are not yet implemented.
 *     tags:
 *       - Analysis
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - email
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Sales data file (.csv or .xlsx, max 10 MB)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Recipient email for the AI-generated insight report
 *     responses:
 *       200:
 *         description: Prototype placeholder response – integration pending
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Prototype endpoint ready for integration.
 *                 meta:
 *                   type: object
 *                   properties:
 *                     filename:
 *                       type: string
 *                     email:
 *                       type: string
 *                     receivedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid file type or missing file
 *       413:
 *         description: File too large (max 10 MB)
 *       422:
 *         description: Validation error (invalid email)
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
router.post(
    "/analyze",
    upload.single("file"),
    analyzeValidationRules,
    handleValidationErrors,
    handleAnalyze
);

module.exports = router;
