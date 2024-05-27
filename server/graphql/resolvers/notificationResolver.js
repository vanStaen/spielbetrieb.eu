import { Notification } from "../../models/Notification.js";
import { User } from "../../models/User.js";

export const notificationResolver = {
  // getAllNotifications for debugging
  async getAllNotifications(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
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
      order: [["_id", "ASC"]],
    });
  },

  // updateNotificationSeen: Notification!
  async updateNotificationSeen(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const updatedNotification = await Notification.update(
        { seen: true },
        {
          where: {
            userId: req.userId,
          },
          returning: true,
          plain: true,
        },
      );
      // updatedNotification[0]: number or row udpated
      // updatedNotification[1]: rows updated
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // deleteNotification(tagId: ID!): Boolean!
  async deleteNotification(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await Notification.destroy({
      where: {
        _id: args.notificationId,
      },
    });
    return true;
  },
};
