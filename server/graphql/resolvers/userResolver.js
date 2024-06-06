import bcrypt from "bcryptjs";
import { mailService } from "../../api/service/mailService.js";
import { notificationService } from "../../api/service/notificationService.js";

import { User } from "../../models/User.js";
import { Comment } from "../../models/Comment.js";
import { Event } from "../../models/Event.js";
import { Message } from "../../models/Message.js";
import { Notification } from "../../models/Notification.js";
import { Photo } from "../../models/Photo.js";
import { Visitor } from "../../models/Visitor.js";
import { Usersfollower } from "../../models/Usersfollower.js";
import { Usersfriend } from "../../models/Usersfriend.js";
import { Usersfriendrequest } from "../../models/Usersfriendrequest.js";

export const userResolver = {
  async getUser(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await User.findOne({
      where: { _id: req.userId },
      include: [
        Comment,
        Event,
        Message,
        Notification,
        Photo,
        Visitor,
        "followers",
        "following",
        "friends",
        "friendrequests",
      ],
      order: [[Notification, "_id", "DESC"]],
    });
  },

  async getUsersAsAdmin(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    return await User.findAll({
      order: [["_id", "ASC"]],
    });
  },

  // addUser(userInput: UserInputData!): User!
  async addUser(args, req) {
    const foundUserEmail = await User.findOne({
      where: {
        email: args.userInput.email.toLowerCase(),
      },
    });
    if (foundUserEmail) {
      throw new Error("This email is already associated with an account.");
    }
    const foundUserUserName = await User.findOne({
      where: {
        userName: args.userInput.userName.toLowerCase(),
      },
    });
    if (foundUserUserName) {
      throw new Error("This username is already associated with an account.");
    }
    try {
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const email = args.userInput.email.toLowerCase();
      const user = new User({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        userName: args.userInput.userName.toLowerCase(),
        email,
        password: hashedPassword,
        description: args.userInput.description,
        gender: args.userInput.gender,
        orientation: args.userInput.orientation,
        wishes: args.userInput.wishes,
        interests: args.userInput.interests,
        language: args.userInput.language,
        birthday: args.userInput.birthday,
        lastActive: Date.now(),
      });
      await mailService.emailVerify(email);
      return await user.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateUser(_id: ID!, userInput: UserInputData!): User!
  async updateUser(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "firstName",
      "lastName",
      "email",
      "description",
      "avatar",
      "emailSettings",
      "profilSettings",
      "friends",
      "birthday",
      "gender",
      "orientation",
      "interests",
      "wishes",
      "archived",
      "usernameChange",
      "language",
    ];
    updatableFields.forEach((field) => {
      if (field in args.userInput) {
        updateFields[field] = args.userInput[field];
      }
    });
    if (args.userInput.password) {
      updateFields.password = await bcrypt.hash(args.userInput.password, 12);
    }
    try {
      const updatedUser = await User.update(updateFields, {
        where: {
          _id: req.userId,
        },
        returning: true,
        plain: true,
      });
      // updatedUser[0]: number or row udpated
      // updatedUser[1]: rows updated
      return updatedUser[1];
    } catch (err) {
      console.log(err);
    }
  },

  // updateUser(_id: ID!, userInput: UserInputData!): User!
  async updateUserAsAdmin(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "firstName",
      "lastName",
      "email",
      "description",
      "avatar",
      "emailSettings",
      "profilSettings",
      "friends",
      "birthday",
      "gender",
      "orientation",
      "interests",
      "wishes",
      "archived",
      "usernameChange",
      "language",
      "suspended",
      "isPartner",
      "partnerRoles",
      "partnertype",
      "verifiedIdentity",
    ];
    updatableFields.forEach((field) => {
      if (field in args.userInput) {
        updateFields[field] = args.userInput[field];
      }
    });
    try {
      const updatedUser = await User.update(updateFields, {
        where: {
          _id: args.userId,
        },
        returning: true,
        plain: true,
      });
      // updatedUser[0]: number or row udpated
      // updatedUser[1]: rows updated
      return updatedUser[1];
    } catch (err) {
      console.log(err);
    }
  },

  async getProfileByName(args, req) {
    return await User.findOne({
      where: { userName: args.userName },
      include: ["friends", "followers", "following", "friendrequests"],
    });
  },

  async getProfileById(args, req) {
    return await User.findOne({
      where: { _id: args._id },
      include: ["friends", "followers", "following", "friendrequests"],
    });
  },

  // deleteUser(_id: ID!): Boolean!
  async deleteUserAsAdmin(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    await User.destroy({
      where: {
        _id: args.userId,
      },
    });
    req.session = null;
    return true;
  },

  // addFollow(followedId: ID!): Boolean!
  async addFollow(args, req) {
    try {
      const newFollow = new Usersfollower({
        follower_id: req.userId,
        followed_id: args.followedId,
      });
      await newFollow.save();
      await notificationService.createNotificationNewFollower(
        args.followedId,
        req.userId,
      );
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  // deleteFollow(followedId: ID!): Boolean!
  async deleteFollow(args, req) {
    await Usersfollower.destroy({
      where: {
        follower_id: req.userId,
        followed_id: args.followedId,
      },
    });
    await notificationService.deleteNotificationNewFollower(
      args.followedId,
      req.userId,
    );
    return true;
  },

  // addFriendRequest(requestedId: ID!): Boolean!
  async addFriendRequest(args, req) {
    try {
      const newFriend = new Usersfriendrequest({
        requesting_id: req.userId,
        requested_id: args.requestedId,
      });
      await newFriend.save();
      await notificationService.createNotificationNewFriendRequest(
        req.userId,
        args.requestedId,
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // isRequested(requestingId: ID!): Boolean!
  async isRequested(args, req) {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized!");
      }
      const res = await Usersfriendrequest.findOne({
        where: {
          requested_id: req.userId,
          requesting_id: args.requestingId,
        },
      });
      console.log(res);
      return !!res;
    } catch (err) {
      console.log(err);
    }
  },

  // deleteFriendRequest(requestedId: ID!): Boolean!
  async deleteFriendRequest(args, req) {
    await Usersfriendrequest.destroy({
      where: {
        requesting_id: req.userId,
        requested_id: args.requestedId,
      },
    });
    await notificationService.deleteNotificationNewFriendRequest(
      req.userId,
      args.requestedId,
    );
    return true;
  },

  // acceptFriendRequest(requestingId: ID!): Boolean!
  async acceptFriendRequest(args, req) {
    try {
      const newFriendFirst = new Usersfriend({
        user_id: req.userId,
        friend_id: args.requestingId,
      });
      await newFriendFirst.save();
      const newFriendSecond = new Usersfriend({
        friend_id: req.userId,
        user_id: args.requestingId,
      });
      await newFriendSecond.save();
      await Usersfriendrequest.destroy({
        where: {
          requesting_id: args.requestingId,
          requested_id: req.userId,
        },
      });
      await notificationService.createNotificationNewFriend(
        req.userId,
        args.requestingId,
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // declineFriendRequest(requestingId: ID!): Boolean!
  async declineFriendRequest(args, req) {
    try {
      await Usersfriendrequest.destroy({
        where: {
          requesting_id: args.requestingId,
          requested_id: req.userId,
        },
      });
      await notificationService.createNotificationFriendRequestDeclined(
        args.requestingId,
        req.userId,
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // deleteFriendship(friendId: ID!): Boolean!
  async deleteFriendship(args, req) {
    try {
      await Usersfriend.destroy({
        where: {
          user_id: args.friendId,
          friend_id: req.userId,
        },
      });
      await Usersfriend.destroy({
        where: {
          user_id: req.userId,
          friend_id: args.friendId,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
    }
  },
};
