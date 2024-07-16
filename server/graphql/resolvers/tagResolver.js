import { Tag } from "../../models/Tag.js";
import { User } from "../../models/User.js";
import { notificationService } from "../../api/service/notificationService.js";

export const tagResolver = {
  // getTags: [Tag]
  async getTags() {
    return await Tag.findAll({
      order: [
        ["validated", "DESC"],
        ["name", "ASC"],
      ],
    });
  },

  // addTag(tagInput: TagInputData!): Tag!
  async addTag(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    const foundTag = await Tag.findOne({
      where: { name: args.tagInput.name },
    });
    if (foundTag) {
      return foundTag;
    }
    try {
      const tag = new Tag({
        name: args.tagInput.name,
        isUserTag: args.tagInput.isUserTag,
        isEventTag: args.tagInput.isEventTag,
        isPictureTag: args.tagInput.isPictureTag,
        isPartnerTag: args.tagInput.isPartnerTag,
        validated: args.tagInput.validated,
      });
      const newTag = await tag.save();
      notificationService.createNotificationForAdmin('data', 93, newTag.name, newTag.id);
      return newTag;
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
      where: { id: req.userId },
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
      "isPartnerTag",
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
          id: args.tagId,
        },
        returning: true,
        plain: true,
      });
      // updatedTag[0]: number or row udpated
      // updatedTag[1]: rows updated
      const tagId = updatedTag[1].dataValues.id;
      notificationService.deleteNotificationForAdmin(93, tagId);
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
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Tag.destroy({
      where: {
        id: args.tagId,
      },
    });
    notificationService.deleteNotificationForAdmin(93, args.tagId);
    return true;
  },
};
