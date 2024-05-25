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
        userLinkId: follower._id,
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

  // TODO: check this
  async createNotificationNewFriendRequest(requestingId, requestedId) {
    try {
      const requesting = await User.findOne({
        where: { _id: requestingId },
      });
      const newNotification = new Notification({
        user_id: requestedId,
        media_url: requesting.avatar,
        title: requesting.userName,
        type: 1,
        action_data: requestingId,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // TODO: check this
  async createNotificationNewFriend(userId, friendId) {
    try {
      const user = await User.findOne({
        where: { _id: userId },
      });
      const newNotification = new Notification({
        user_id: friendId,
        media_url: user.avatar,
        title: user.userName,
        type: 17,
        action_data: userId,
      });
      await newNotification.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // TODO: check this
  async deleteNotificatioFriendRequest(requestingId, requestedId) {
    try {
      return await Notification.destroy({
        where: {
          user_id: requestedId,
          action_data: requestingId,
          type: 1,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

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
