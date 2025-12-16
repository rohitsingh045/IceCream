// filepath: c:\Users\rohit\OneDrive\Desktop\ICE\backend\Controller\ContactController.js
const { sendEmail } = require("../services/emailService");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // basic validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // email to site owner (optional)
    await sendEmail({
      to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
      subject: `New contact message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to send message" });
  }
};

module.exports = {
  submitContactForm, // <- must be exported
};