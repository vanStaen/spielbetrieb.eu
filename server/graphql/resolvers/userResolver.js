import bcrypt from "bcryptjs";
import { mailService } from "../../api/service/mailService.js";

import { User } from "../../models/User.js";
import { Comment } from "../../models/Comment.js";
import { Event } from "../../models/Event.js";
import { Message } from "../../models/Message.js";
import { Notification } from "../../models/Notification.js";
import { Photo } from "../../models/Photo.js";
import { Visitor } from "../../models/Visitor.js";

export const userResolver = {
  async getUser(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await User.findOne({
      where: { _id: req.userId },
      include: [Comment, Event, Message, Notification, Photo, Visitor, "friends", "followers", "followed"],
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
      include: ["friends", "followers", "followed"],
    });
  },

  async getProfileById(args, req) {
    return await User.findOne({
      where: { _id: args._id },
      include: ["friends", "followers", "followed"],
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
};
