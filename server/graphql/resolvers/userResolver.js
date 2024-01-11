const bcrypt = require("bcryptjs");
const mailService = require("../../api/service/mailService");

const { User } = require("../../models/User");
const { Comment } = require("../../models/Comment");
const { Event } = require("../../models/Event");
const { Message } = require("../../models/Message");
const { Notification } = require("../../models/Notification");
const { Photo } = require("../../models/Photo");
const { Visitor } = require("../../models/Visitor");

exports.userResolver = {
  async getUser(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await User.findOne({
      where: { _id: req.userId },
      include: [Comment, Event, Message, Notification, Photo, Visitor],
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
        email: email,
        password: hashedPassword,
        description: args.userInput.description,
        gender: args.userInput.gender,
        orientation: args.userInput.orientation,
        wishes: args.userInput.wishes,
        interests: args.userInput.interests,
        lastActive: Date.now(),
      });
      await mailService.mailService.emailVerify(email);
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

  async getProfileByName(args, req) {
    return await User.findOne({
      where: { userName: args.userName },
      include: [
        "friends",
        "followers",
        "followed",
      ],
    });
  },

  async getProfileById(args, req) {
    return await User.findOne({
      where: { _id: args._id },
      include: [
        "friends",
        "followers",
        "followed",
      ],
    });
  },

  // deleteUser(_id: ID!): Boolean!
  async deleteUser(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await User.destroy({
      where: {
        _id: req.userId,
      },
    });
    req.session = null;
    return true;
  },
};
