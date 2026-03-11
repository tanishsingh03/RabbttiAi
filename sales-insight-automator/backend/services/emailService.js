/**
 * @module emailService
 * @description Sends AI-generated insight reports via email.
 */

// TODO: configure once SMTP credentials are added to .env
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   host:   process.env.SMTP_HOST,
//   port:   Number(process.env.SMTP_PORT),
//   secure: false,
//   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
// });

/**
 * Send an insight report to the recipient's email address.
 * @param {string} recipientEmail
 * @param {string} htmlContent
 * @returns {Promise<{ success: boolean, messageId?: string }>}
 */
async function sendReport(recipientEmail, htmlContent) {
    // const info = await transporter.sendMail({
    //   from:    process.env.SMTP_FROM,
    //   to:      recipientEmail,
    //   subject: "Your Sales Insight Report",
    //   html:    htmlContent,
    // });
    // return { success: true, messageId: info.messageId };

    return { success: false };
}

module.exports = { sendReport };
