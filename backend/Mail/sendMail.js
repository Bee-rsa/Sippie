// sendMail.js
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Function to get SMTP configuration based on the email service
const getSmtpConfig = (email) => {
  const domain = email.split("@")[1].toLowerCase();

  switch (domain) {
    case "gmail.com":
      return {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      };
    case "outlook.com":
    case "hotmail.com":
      return {
        host: "smtp.office365.com", // Outlook SMTP server
        port: 3000,
        secure: false, // TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      };
    default:
      // For custom domains (e.g., yourdomain.com)
      return {
        host: process.env.SMTP_HOST, // SMTP server for custom domain
        port: process.env.SMTP_PORT || 3000,
        secure: process.env.SMTP_SECURE === "true", // TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      };
  }
};

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  try {
    // Determine the SMTP configuration based on the sender's email
    const smtpConfig = getSmtpConfig(process.env.EMAIL_USER);

    // Create a transporter object
    const transporter = nodemailer.createTransport(smtpConfig);

    // Define mail options
    const mailOptions = {
      from: `"Your Company Name" <${process.env.EMAIL_USER}>`, // Sender name and email
      to: Array.isArray(to) ? to.join(", ") : to, // Handle single or multiple recipients
      subject,
      text,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;






