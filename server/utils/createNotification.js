import Notification from "../models/notificationModel.js";

import User from "../models/User.js";

import sendEmail from "./sendEmail.js";

const createNotification = async ({
  userId,
  title,
  message,
  type,
  emailSubject,
  emailHtml,
}) => {

  try {

    // ==========================
    // SAVE NOTIFICATION
    // ==========================

    await Notification.create({
      user: userId,

      title,

      message,

      type,
    });

    // ==========================
    // FIND USER
    // ==========================

    const user =
      await User.findById(
        userId
      );

    // ==========================
    // SEND EMAIL
    // ==========================

    if (user?.email) {

      await sendEmail({
        to: user.email,

        subject:
          emailSubject || title,

        html:
          emailHtml ||
          `
            <div style="font-family:sans-serif;">

              <h2>${title}</h2>

              <p>${message}</p>

            </div>
          `,
      });

    }

  } catch (error) {

    console.log(
      "NOTIFICATION ERROR:",
      error.message
    );

  }

};

export default createNotification;