// filepath: c:\Users\rohit\OneDrive\Desktop\ICE\backend\Controller\ContactController.js
const { sendEmail } = require("../services/emailService");

const submitContactForm = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    // basic validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email and message are required" });
    }

    // email to site owner
    await sendEmail({
      to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
      subject: subject ? `${subject} - from ${name}` : `New contact message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">📧 New Contact Message</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
            <p style="margin: 10px 0;"><strong style="color: #333;">👤 Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">📞 Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">✉️ Email:</strong> <a href="mailto:${email}" style="color: #e91e63;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #333;">📝 Subject:</strong> ${subject || 'No subject'}</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
            <h3 style="color: #333; margin-top: 0;">💬 Message:</h3>
            <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
            This message was sent from Namaste Bharat Ice Cream website contact form.
          </p>
        </div>
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
  submitContactForm,
};