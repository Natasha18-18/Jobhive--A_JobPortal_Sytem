import nodemailer from "nodemailer";

const sendEmail = async (email, otp) => {

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Job Portal OTP Verification",

      html: `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `,
    });

    console.log("EMAIL SENT:", info.response);

  }

  catch (error) {

    console.log("EMAIL ERROR:", error);

    throw error;

  }

};

export default sendEmail;