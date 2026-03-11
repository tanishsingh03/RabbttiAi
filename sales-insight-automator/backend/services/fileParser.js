/**
 * @module fileParser
 * @description Parses uploaded CSV and XLSX files into structured row data.
 */

// TODO: install csv-parse or xlsx once env is confirmed
// const Papa = require("papaparse");
// const XLSX = require("xlsx");

/**
 * Parse a file buffer into structured row data.
 * @param {Buffer} fileBuffer
 * @param {string} mimeType
 * @returns {Promise<Array<Object>>}
 */
async function parseFile(fileBuffer, mimeType) {
    // CSV branch
    // if (mimeType === "text/csv") { ... }
    // XLSX branch
    // const workbook = XLSX.read(fileBuffer); ...

    return [];
}

/**
 * Check that the dataset contains the required columns.
 * @param {Array<Object>} rows
 * @param {string[]} required
 * @returns {{ valid: boolean, missing: string[] }}
 */
function validateSchema(rows, required = []) {
    if (!rows.length) return { valid: false, missing: required };
    const keys = Object.keys(rows[0]);
    const missing = required.filter((col) => !keys.includes(col));
    return { valid: missing.length === 0, missing };
}

module.exports = { parseFile, validateSchema };
