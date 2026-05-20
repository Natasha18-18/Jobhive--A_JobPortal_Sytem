import mongoose from "mongoose";

const messageSchema =
  new mongoose.Schema(
    {
      sender: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },

      receiver: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },

      text: {
        type: String,
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const Message =
  mongoose.model(
    "messages",
    messageSchema
  );

export default Message;