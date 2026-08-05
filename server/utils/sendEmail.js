const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, subject, text) => {
  const { data, error } = await resend.emails.send({
    from: "Auth App <onboarding@resend.dev>",
    to: email,
    subject: subject,
    text: text,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email");
  }

  console.log("Email sent:", data);
  return data;
};

module.exports = sendEmail;