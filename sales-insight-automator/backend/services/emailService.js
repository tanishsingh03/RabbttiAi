/**
 * @module emailService
 * @description Placeholder service for delivering AI-generated insight reports via email.
 *
 * ─── Integration Guide ────────────────────────────────────────────────────────
 * In a production implementation this module would:
 *
 *   1. Accept a recipient email address and a formatted report payload.
 *   2. Compose an HTML email using a templating engine (e.g., Handlebars, MJML).
 *   3. Send the email via a transactional email provider:
 *      a) Nodemailer + SMTP (Gmail, Outlook, custom mail server).
 *      b) SendGrid         – https://sendgrid.com/
 *      c) Mailgun          – https://mailgun.com/
 *      d) AWS SES          – https://aws.amazon.com/ses/
 *   4. Return a delivery receipt / message ID for audit logging.
 *   5. Handle bounce-back and retry logic.
 *
 * Suggested libraries:
 *   - nodemailer    : https://nodemailer.com/
 *   - @sendgrid/mail : https://github.com/sendgrid/sendgrid-nodejs
 *   - mjml          : https://mjml.io/  (responsive email templates)
 * ─────────────────────────────────────────────────────────────────────────────
 */

// TODO: Install and configure your chosen email transport.
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({ ... });

/**
 * Send the AI-generated sales insight report to the specified email.
 *
 * @param {string} recipientEmail - Validated recipient email address.
 * @param {string} reportContent  - Plain-text or HTML report content.
 * @returns {Promise<{ success: boolean, messageId?: string }>}
 */
async function sendReport(recipientEmail, reportContent) {
    // TODO: Implement email delivery here.
    // Example Nodemailer call:
    //   const info = await transporter.sendMail({
    //     from: `"Sales Insight Bot" <${process.env.SMTP_FROM}>`,
    //     to: recipientEmail,
    //     subject: "Your AI-Powered Sales Insight Report",
    //     html: reportContent,
    //   });
    //   return { success: true, messageId: info.messageId };

    console.warn(`[emailService] sendReport() called for ${recipientEmail} but is not implemented.`);
    return { success: false, messageId: null };
}

module.exports = { sendReport };
