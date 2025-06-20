// import nodeMailer from "nodemailer"

// export const sendEmail = async ({ email, subject, message }) => {
//     const transporter = nodeMailer.createTransport({
//       host: process.env.SMTP_HOST,
//       service: process.env.SMTP_SERVICE,
//       port: process.env.SMTP_PORT,
//       secure: true, // Use SSL for port 465
//       auth: {
//         user: process.env.SMTP_MAIL,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });
  
//     const mailOptions = {
//       from: process.env.SMTP_MAIL,
//       to: email,
//       subject,
//       html: message,
//     };

//     await transporter.sendMail(mailOptions)





//   };

import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Ensure .env is loaded if not already
dotenv.config({ path: "./config/config.env" });

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for 587
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"BookWorm" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
