import Message from "../models/Message.js";


// ==========================
// SEND MESSAGE
// ==========================

export const sendMessage =
  async (req, res) => {

    try {

      const sender =
        req.user.id;

      const {
        receiver,
        text,
      } = req.body;

      if (
        !receiver ||
        !text
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields required",
        });
      }

      const newMessage =
        await Message.create({
          sender,
          receiver,
          text,
        });

      res.status(201).json({
        success: true,
        message:
          "Message sent successfully",
        data: newMessage,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };


// ==========================
// GET CONVERSATION
// ==========================

export const getConversation =
  async (req, res) => {

    try {

      const myId =
        req.user.id;

      const otherUserId =
        req.params.userId;

      const messages =
        await Message.find({
          $or: [
            {
              sender: myId,
              receiver:
                otherUserId,
            },
            {
              sender:
                otherUserId,
              receiver: myId,
            },
          ],
        }).sort({
          createdAt: 1,
        });

      res.status(200).json({
        success: true,
        data: messages,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };