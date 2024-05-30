import { Notification } from "../../models/Notification.js";
import { User } from "../../models/User.js";

export const notificationService = {
  async createNotificationNewFollower(userId, followerId) {
    try {
      const follower = await User.findOne({
        where: { _id: followerId },
      });
      const newNotification = new Notification({
        userId,
        userLinkId: followerId,
        mediaUrl: follower.avatar,
        data: follower.userName,
        actionData: followerId,
        type: 2,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteNotificationNewFollower(userId, followerId) {
    try {
      await Notification.destroy({
        where: {
          userId,
          actionData: followerId,
          userLinkId: followerId,
          type: 2,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  async createNotificationNewFriendRequest(requestingId, requestedId) {
    try {
      const requesting = await User.findOne({
        where: { _id: requestingId },
      });
      const newNotification = new Notification({
        userId: requestedId,
        mediaUrl: requesting.avatar,
        type: 1,
        data: requesting.userName,
        actionData: requestingId,
        userLinkId: requestingId,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },


  async deleteNotificationNewFriendRequest(requestingId, requestedId) {
    try {
      await Notification.destroy({
        where: {
          userId: requestedId,
          actionData: requestingId,
          userLinkId: requestingId,
          type: 1,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  },


  async createNotificationNewFriend(requestedId, requestingId) {
    try {
      const userRequested = await User.findOne({
        where: { _id: requestedId },
      });
      const newNotification = new Notification({
        userId: requestingId,
        mediaUrl: userRequested.avatar,
        type: 11,
        data: userRequested.userName,
        action_data: requestedId,
        userLinkId: requestedId,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // TODO: createNotificationFriendRequestRefused

  // TODO: check this
  async createNotificationBasic(
    userId,
    mediaUrl,
    notificationType,
    actionData,
  ) {
    try {
      const user = await User.findOne({
        where: { _id: userId },
        include: ["friends", "followers"],
      });
      const username = user.userName;
      const listOfFriendsAndFollowersId = [];
      user.friends.forEach((friend) => {
        listOfFriendsAndFollowersId.push(friend._id);
      });
      user.followers.forEach((follower) => {
        listOfFriendsAndFollowersId.push(follower._id);
      });
      const listOfUniqueId = [...new Set(listOfFriendsAndFollowersId)];
      for (const id of listOfUniqueId) {
        const newNotification = new Notification({
          user_id: id,
          media_url: mediaUrl,
          title: username,
          type: notificationType,
          action_data: actionData,
        });
        await newNotification.save();
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // TODO: check this
  async createNotificationSingle(
    userId,
    userNotifiedId,
    mediaUrl,
    notificationType,
    actionData,
  ) {
    try {
      const user = await User.findOne({
        where: { _id: userId },
      });
      const username = user.userName;
      const newNotification = new Notification({
        user_id: userNotifiedId,
        media_url: mediaUrl,
        title: username,
        type: notificationType,
        action_data: actionData,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
