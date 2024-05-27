import { Usersfollower } from "../../models/Usersfollower.js";
import { notificationService } from "./notificationService.js";

export const followerService = {
  async getFollower(userId) {
    const foundFollowers = await Usersfollower.findAll({
      where: { followed_id: userId },
    });
    return foundFollowers;
  },

  async getFollowing(userId) {
    const foundFollowing = await Usersfollower.findAll({
      where: { follower_id: userId },
    });
    return foundFollowing;
  },

  async addFollow(follower, following) {
    try {
      const newFollow = new Usersfollower({
        follower_id: follower,
        followed_id: following,
      });
      const newFollower = await newFollow.save();
      await notificationService.createNotificationNewFollower(
        following,
        follower,
      );
      return newFollower;
    } catch (err) {
      console.log(err);
    }
  },

  async deleteFollow(follower, following) {
    await Usersfollower.destroy({
      where: {
        follower_id: follower,
        followed_id: following,
      },
    });
    await notificationService.deleteNotificationNewFollower(
      following,
      follower,
    );
    return true;
  },
};
