const { Dark } = require("../../models/Dark");
const { User } = require("../../models/User");

exports.darkResolver = {
  // getDark(darkId: ID!): Dark
  async getDark(args) {
    return await Dark.findOne({
      where: { _id: args.darkId },
    });
  },

  // getDarks: [Dark]
  async getDarks() {
    return await Dark.findAll({
      order: [["createdAt", "ASC"]],
    });
  },

  // addDark(darkInput: DarkInputData!): Dark!
  async addDark(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
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
      where: { _id: req.userId },
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
    ];
    updatableFields.forEach((field) => {
      if (field in args.darkInput) {
        updateFields[field] = args.darkInput[field];
      }
    });
    try {
      const updatedDark = await Dark.update(updateFields, {
        where: {
          _id: args.darkId,
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

  // archiveDark(darkId: ID!): Boolean!
  async deleteDark(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("content")) {
      throw new Error("Unauthorized!");
    }
    const foundDark = await Dark.findOne({
      where: { _id: args.darkId, },
    });
    const updatedDark = await Dark.update(
      { archived: true },
      {
        where: {
          _id: args.darkId,
        },
        returning: true,
        plain: true,
      });
    // updatedDark[0]: number or row udpated
    // updatedDark[1]: rows updated
    return updatedDark[1];
  },
};
