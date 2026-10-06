const sendEmail = async (email, subject, text) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "User Authentication System",
          email: process.env.SENDER_EMAIL,
        },
        to: [{ email: email }],
        subject: subject,
        textContent: text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo error:", data);
      throw new Error("Failed to send email");
    }

    console.log("Email sent:", data.messageId);
    return data;
  } catch (error) {
    console.error("EMAIL SEND FAILED:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;