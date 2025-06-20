import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" }); // adjust path if your .env is elsewhere

const sendTestEmail = async () => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465", // SSL for port 465
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: process.env.SMTP_MAIL, // send to yourself
      subject: "Test Email from Bookworm",
      html: `<p>This is a test email to verify SMTP configuration.</p>`,
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

sendTestEmail();
