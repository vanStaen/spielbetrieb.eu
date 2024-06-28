import { Dark } from "../../models/Dark.js";
import { User } from "../../models/User.js";

export const darkResolver = {
  // getDark(darkId: ID!): Dark
  async getDark(args) {
    return await Dark.findOne({
      where: { id: args.darkId },
    });
  },

  // getDarks: [Dark]
  async getDarks() {
    return await Dark.findAll({
      order: [["createdAt", "ASC"]],
    });
  },

  // getPublicDarks: [Dark]
  async getPublicDarks() {
    return await Dark.findAll({
      order: [["number", "DESC"]],
      where: { archived: false },
    });
  },

  // addDark(darkInput: DarkInputData!): Dark!
  async addDark(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    try {
      const dark = new Dark({
        number: args.darkInput.number,
        title: args.darkInput.title,
        description: args.darkInput.description,
        pictures: args.darkInput.pictures,
        link: args.darkInput.link,
        tags: args.darkInput.tags,
      });
      return await dark.save();
    } catch (err) {
      console.log(err);
    }
  },

  // editDark(darkId: ID!, darkInput: DarkInputData!): Dark!
  async updateDark(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "number",
      "title",
      "description",
      "pictures",
      "link",
      "tags",
      "archived",
    ];
    updatableFields.forEach((field) => {
      if (field in args.darkInput) {
        updateFields[field] = args.darkInput[field];
      }
    });
    try {
      const updatedDark = await Dark.update(updateFields, {
        where: {
          id: args.darkId,
        },
        returning: true,
        plain: true,
      });
      // updatedDark[0]: number or row udpated
      // updatedDark[1]: rows updated
      return updatedDark[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteDark(darkId: ID!): Boolean!
  async deleteDark(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("content")) {
      throw new Error("Unauthorized!");
    }
    await Dark.destroy({
      where: {
        id: args.darkId,
      },
    });
    return true;
  },
};
