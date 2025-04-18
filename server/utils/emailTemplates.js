export function generateVerificationOtpEmailTemplate(otpCode) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
        <h2 style="color: #000; text-align: center;">Verify Your Email Address</h2>
        <p style="font-size: 16px; color: #555; text-align: center;">Dear User,</p>
        <p style="font-size: 16px; color: #555; text-align: center;">
          To complete your registration or login, please use the following OTP code:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #000; padding: 10px 20px;">
            ${otpCode}
          </span>
        </div>
        <p style="font-size: 16px; color: #777; text-align: center;">
          This code is valid for 15 minutes. Please do not share this code with anyone.
        </p>
        <p style="font-size: 16px; color: #777; text-align: center;">
          If you did not request this email, please ignore it.
        </p>
        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
          <p>Thank you,<br>BookWorm Team</p>
          <p style="font-size: 12px; color: #444;">This is an automated message. Please do not reply to this email.</p>
        </footer>
      </div>
    `;
  }
  