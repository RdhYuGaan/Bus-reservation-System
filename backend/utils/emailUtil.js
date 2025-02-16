const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html, qrCodeBuffer) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html, // HTML content for the email
      attachments: [
        {
          filename: "qrcode.png",
          content: qrCodeBuffer, // QR Code as an attachment
          cid: "qrcode", // Content ID for embedding in email
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
