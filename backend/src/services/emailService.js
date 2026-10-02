const nodemailer = require("nodemailer");

function getTransporter() {
  const user = process.env.SMTP_USERNAME || process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASSWORD;
  const host = process.env.SMTP_SERVER || process.env.SMTP_HOST || (user && pass ? "smtp.gmail.com" : undefined);
  const port = Number(process.env.SMTP_PORT || 587);

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendEmail({ to, subject, text, html }) {
  const transporter = getTransporter();
  if (!transporter) {
    return false;
  }

  await transporter.sendMail({
    from: process.env.SMTP_USERNAME || process.env.SMTP_USER || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  return true;
}

module.exports = { sendEmail };
