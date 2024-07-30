/* eslint-disable camelcase */
import { Notification } from "../../models/Notification.js";
import { User } from "../../models/User.js";
import { Op } from "sequelize";

export const notificationService = {
  async createNotificationNewFollower(userId, follower_id) {
    try {
      const follower = await User.findOne({
        where: { id: follower_id },
      });
      const newNotification = new Notification({
        userId,
        userLinkId: follower_id,
        mediaUrl: follower.avatar,
        data: follower.userName,
        actionData: follower_id,
        type: 2,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteNotificationNewFollower(userId, follower_id) {
    try {
      await Notification.destroy({
        where: {
          userId,
          actionData: follower_id,
          userLinkId: follower_id,
          type: 2,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationNewFriendRequest(requesting_id, requested_id) {
    try {
      const requesting = await User.findOne({
        where: { id: requesting_id },
      });
      const newNotification = new Notification({
        userId: requested_id,
        mediaUrl: requesting.avatar,
        type: 1,
        data: requesting.userName,
        actionData: requesting_id,
        userLinkId: requesting_id,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationFriendRequestDeclined(requesting_id, requested_id) {
    try {
      const userRequested = await User.findOne({
        where: { id: requested_id },
      });
      const newNotification = new Notification({
        userId: requesting_id,
        mediaUrl: userRequested.avatar,
        type: 12,
        data: userRequested.userName,
        actionData: requested_id,
        userLinkId: requested_id,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteNotificationNewFriendRequest(requesting_id, requested_id) {
    try {
      await Notification.destroy({
        where: {
          userId: requested_id,
          actionData: requesting_id,
          userLinkId: requesting_id,
          type: 1,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationNewFriend(requested_id, requesting_id) {
    try {
      const userRequested = await User.findOne({
        where: { adminRoles: requested_id },
      });
      const newNotification = new Notification({
        userId: requesting_id,
        mediaUrl: userRequested.avatar,
        type: 11,
        data: userRequested.userName,
        actionData: requested_id,
        userLinkId: requested_id,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationForAdmin(
    adminRole,
    notificationType,
    stringData,
    integerData,
    mediaUrl,
  ) {
    try {
      const admins = await User.findAll({
        where: {
          adminRoles: { [Op.contains]: [adminRole] },
          isAdmin: true,
        },
      });
      for (const admin of admins) {
        const newNotification = new Notification({
          userId: admin.id,
          type: notificationType,
          data: stringData,
          actionData: integerData,
          mediaUrl,
        });
        await newNotification.save();
      }
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  async deleteNotificationForAdmin(notificationType, integerData) {
    try {
      await Notification.destroy({
        where: {
          actionData: integerData,
          type: parseInt(notificationType),
        },
      });
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  /*
  async createNotificationBasic(
    userId,
    mediaUrl,
    notificationType,
    actionData,
  ) {
    try {
      const user = await User.findOne({
        where: { id: userId },
        include: ["friends", "followers"],
      });
      const username = user.userName;
      const listOfFriendsAndFollowersId = [];
      user.friends.forEach((friend) => {
        listOfFriendsAndFollowersId.push(friend.id);
      });
      user.followers.forEach((follower) => {
        listOfFriendsAndFollowersId.push(follower.id);
      });
      const listOfUniqueId = [...new Set(listOfFriendsAndFollowersId)];
      for (const id of listOfUniqueId) {
        const newNotification = new Notification({
          userId: id,
          media_url: mediaUrl,
          title: username,
          type: notificationType,
          actionData: actionData,
        });
        await newNotification.save();
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationSingle(
    userId,
    userNotifiedId,
    mediaUrl,
    notificationType,
    actionData,
  ) {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      const username = user.userName;
      const newNotification = new Notification({
        userId: userNotifiedId,
        media_url: mediaUrl,
        title: username,
        type: notificationType,
        actionData: actionData,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  */
};
