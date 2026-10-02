const Contact = require("../models/Contact");
const { sendEmail } = require("../services/emailService");

async function createContact(req, res) {
  const { name, email, subject, message } = req.body;
  const contact = await Contact.create({ name, email, subject, message });

  await sendEmail({
    to: process.env.SMTP_USERNAME || email,
    subject: `New Contact Message: ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message}</p>`,
  });

  res.json({
    message: "Message sent successfully",
    id: contact.id,
  });
}

async function getContacts(_req, res) {
  const contacts = await Contact.find({}).sort({ created_at: -1 });
  res.json({
    items: contacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      status: contact.status,
      created_at: contact.created_at,
    })),
  });
}

module.exports = { createContact, getContacts };
