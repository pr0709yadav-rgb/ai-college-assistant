import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (
  email,
  otp
) => {
  try {
    const mailOptions = {
      from: `"AI College Assistant" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "Password Reset OTP",

      html: `
        <div style="font-family:Arial;padding:25px">

            <h2>AI College Assistant</h2>

            <p>
                Your OTP for password reset is:
            </p>

            <h1
                style="
                    color:#2563eb;
                    letter-spacing:4px;
                "
            >
                ${otp}
            </h1>

            <p>
                This OTP will expire in
                <b>10 minutes</b>.
            </p>

            <p>
                If you didn't request this,
                simply ignore this email.
            </p>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.log("Email Error:", error);

    throw new Error("Unable to send OTP.");
  }
};