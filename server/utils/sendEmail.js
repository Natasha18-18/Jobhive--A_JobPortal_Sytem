import nodemailer from "nodemailer";

const sendEmail = async ({
  to,
  subject,
  html,
}) => {

  try {

    // ==========================
    // TRANSPORTER
    // ==========================

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },
      });

    // ==========================
    // SEND EMAIL
    // ==========================

    const info =
      await transporter.sendMail({
        from:
          `"Job Portal" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html,
      });

    console.log(
      "EMAIL SENT:",
      info.response
    );

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error.message
    );

    throw error;

  }

};

export default sendEmail;