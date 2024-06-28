import { Message } from "../../models/Message.js";
import { User } from "../../models/User.js";
import { Chat } from "../../models/Chat.js";

export const messageResolver = {
  // getMessage
  async getMessages(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Message.findAll({
      where: {
        chatId: args.chatId,
      },
      include: [User, Chat],
    });
  },

  // addMessage(messageInput: MessageInputData!): Message!
  async addMessage(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const message = new Message({
        userId: req.userId,
        chatId: args.chatId,
        message: args.messageInput.message,
        attachedPhotoUrl: args.messageInput.attachedPhotoUrl,
      });
      return await message.save();
    } catch (err) {
      console.log(err);
    }
  },

  // deleteMessage(id: ID!): Boolean!
  async deleteMessage(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await Message.destroy({
      where: {
        id: args.messageId,
      },
    });
    return true;
  },
};
