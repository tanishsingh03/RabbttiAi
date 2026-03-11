const { body, validationResult } = require("express-validator");

// ─── Validation Rules ─────────────────────────────────────────────────────────
const analyzeValidationRules = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email address is required.")
        .isEmail()
        .withMessage("A valid email address is required.")
        .normalizeEmail(),
];

// ─── Validation Result Handler ────────────────────────────────────────────────
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: "error",
            message: "Validation failed.",
            errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
        });
    }
    next();
};

module.exports = { analyzeValidationRules, handleValidationErrors };
