/**
 * @module aiService
 * @description Analyses structured sales data using an LLM and returns insights.
 */

// TODO: configure once OPENAI_API_KEY is added to .env
// const OpenAI = require("openai");
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Run AI analysis on parsed sales rows.
 * @param {Array<Object>} dataset
 * @returns {Promise<Object>}
 */
async function analyzeData(dataset) {
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [
    //     { role: "system", content: "You are an expert sales data analyst. Return JSON insights." },
    //     { role: "user",   content: JSON.stringify(dataset.slice(0, 200)) },
    //   ],
    //   response_format: { type: "json_object" },
    // });
    // return JSON.parse(response.choices[0].message.content);

    return { summary: "", trends: [], recommendations: [] };
}

/**
 * Convert an insight object to a formatted HTML report.
 * @param {Object} insights
 * @returns {string}
 */
function generateReport(insights) {
    // TODO: use an MJML or Handlebars template for the email body
    return `<h1>Sales Insight Report</h1><pre>${JSON.stringify(insights, null, 2)}</pre>`;
}

module.exports = { analyzeData, generateReport };
