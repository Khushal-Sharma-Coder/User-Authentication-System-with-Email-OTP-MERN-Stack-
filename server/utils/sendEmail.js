const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, subject, text) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: subject,
    text: text,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("Email sent:", response[0].statusCode);
    return response;
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;