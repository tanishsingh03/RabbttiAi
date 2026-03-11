const multer = require("multer");
const path = require("path");

// ─── Allowed MIME Types ──────────────────────────────────────────────────────
const ALLOWED_MIME_TYPES = [
    "text/csv",
    "application/csv",
    "application/vnd.ms-excel",                                         // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];

const ALLOWED_EXTENSIONS = [".csv", ".xlsx"];

// ─── Storage ──────────────────────────────────────────────────────────────────
// NOTE: Using memoryStorage so files are held as Buffer objects in req.file.buffer.
// In a production implementation, swap to diskStorage or stream directly to
// cloud storage (e.g., AWS S3) before passing to the fileParser service.
const storage = multer.memoryStorage();

// ─── File Filter ──────────────────────────────────────────────────────────────
const fileFilter = (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (ALLOWED_EXTENSIONS.includes(ext) && ALLOWED_MIME_TYPES.includes(mime)) {
        cb(null, true);
    } else {
        cb(
            Object.assign(new Error("Invalid file type. Only .csv and .xlsx files are accepted."), {
                status: 400,
            }),
            false
        );
    }
};

// ─── Multer Instance ──────────────────────────────────────────────────────────
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB max
        files: 1,
    },
});

module.exports = upload;
