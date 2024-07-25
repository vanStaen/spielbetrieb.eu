import { Notification } from "../../models/Notification.js";
import { User } from "../../models/User.js";

export const notificationResolver = {
  // getAllNotifications for debugging
  async getAllNotifications(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    return await Notification.findAll({
      include: User,
    });
  },

  // getNotification
  async getNotifications(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Notification.findAll({
      where: {
        userId: req.userId,
      },
      include: User,
      order: [["id", "ASC"]],
    });
  },

  // updateNotificationSeen(notificationId: ID!): Boolean!
  async updateNotificationSeen(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      await Notification.update(
        { seen: true },
        {
          where: {
            id: args.notificationId,
            userId: req.userId,
          },
          returning: true,
          plain: true,
        },
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // updateAllNotificationSeen: Boolean!
  async updateAllNotificationSeen(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      await Notification.update(
        { seen: true },
        {
          where: {
            userId: req.userId,
          },
          returning: true,
          plain: true,
        },
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // deleteNotification(notificationId: ID!): Boolean!
  async deleteNotification(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await Notification.destroy({
      where: {
        id: args.notificationId,
      },
    });
    return true;
  },
};
