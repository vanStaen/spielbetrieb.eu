import { Op } from "sequelize";
import { Chat } from "../../models/Chat.js";

export const chatResolver = {
  // getChat
  async getChats(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Chat.findAll({
      where: {
        userlist: {
          [Op.overlap]: [args.userId],
        },
      },
    });
  },

  // createChat(chatId: ID!, chatInput: ChatInputData!): Chat!
  async createChat(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const chat = new Chat({
        userlist: args.chatInput.userlist,
      });
      return await chat.save();
    } catch (err) {
      console.log(err);
    }
  },

  // archiveChat(chatId: ID!): Boolean!
  async archiveChat(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const updatedChat = await Chat.update(
        { archived: true },
        {
          where: {
            id: args.chatId,
          },
          returning: true,
          plain: true,
        },
      );
      // updatedChat[0]: number or row udpated
      // updatedChat[1]: rows updated
      return updatedChat[1];
    } catch (err) {
      console.log(err);
    }
  },
};
