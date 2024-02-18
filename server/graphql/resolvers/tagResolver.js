const { Tag } = require("../../models/Tag");
const { User } = require("../../models/User");

exports.tagResolver = {
  // getTags: [Tag]
  async getTags() {
    return await Tag.findAll({
      order: [["name", "ASC"]],
    });
  },

  // addTag(tagInput: TagInputData!): Tag!
  async addTag(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    try {
      const tag = new Tag({
        name: args.tagInput.name,
        isUserTag: args.tagInput.isUserTag,
        isEventTag: args.tagInput.isEventTag,
        isPictureTag: args.tagInput.isPictureTag,
        validated: args.tagInput.validated,
      });
      return await tag.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateTag(tagId: ID!, tagInput: TagInputData!): Tag!
  async updateTag(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "name",
      "isUserTag",
      "isEventTag",
      "isPictureTag",
      "validated",
    ];
    updatableFields.forEach((field) => {
      if (field in args.tagInput) {
        updateFields[field] = args.tagInput[field];
      }
    });
    try {
      const updatedTag = await Tag.update(updateFields, {
        where: {
          _id: args.tagId,
        },
        returning: true,
        plain: true,
      });
      // updatedTag[0]: number or row udpated
      // updatedTag[1]: rows updated
      return updatedTag[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteTag(tagId: ID!): Boolean!
  async deleteTag(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Tag.destroy({
      where: {
        _id: args.tagId,
      },
    });
    return true;
  },
};
