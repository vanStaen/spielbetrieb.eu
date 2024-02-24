const { Notification } = require("../../models/Notification");
const { User } = require("../../models/User");

exports.notificationResolver = {
  // getNotification
  async getNotifications(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Notification.findAll({
      where: {
        userId: req.userId,
      },
      include: User,
    });
  },

  // addNotification(notificationInput: NotificationInputData!): Notification!
  async addNotification(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const notification = new Notification({
        userId: req.userId,
        notification: args.notificationInput.notification,
        photoLinkId: args.notificationInput.photoLinkId,
        userLinkId: args.notificationInput.userLinkId,
        eventLinkId: args.notificationInput.eventLinkId,
        notificationType: args.notificationInput.notificationType,
      });
      return await notification.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateNotification(_id: ID!, seen: Boolean!): Notification!
  async updateNotification(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const updatedNotification = await Notification.update(
        { seen: args.seen },
        {
          where: {
            _id: args.notificationId,
          },
          returning: true,
          plain: true,
        },
      );
      // updatedNotification[0]: number or row udpated
      // updatedNotification[1]: rows updated
      return updatedNotification[1];
    } catch (err) {
      console.log(err);
    }
  },
};
