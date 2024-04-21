import { Translation } from "../../models/Translation.js";
import { User } from "../../models/User.js";

export const translationResolver = {
  // getTranslations: [Translation]
  async getTranslations() {
    return await Translation.findAll({
      order: [["name", "ASC"]],
    });
  },

  // addTranslation(translationInput: TranslationInputData!): Translation!
  async addTranslation(args, req) {
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
      const translation = new Translation({
        name: args.translationInput.name,
        isUserTranslation: args.translationInput.isUserTranslation,
        isEventTranslation: args.translationInput.isEventTranslation,
        isPictureTranslation: args.translationInput.isPictureTranslation,
        validated: args.translationInput.validated,
      });
      return await translation.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateTranslation(translationId: ID!, translationInput: TranslationInputData!): Translation!
  async updateTranslation(args, req) {
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
      "isUserTranslation",
      "isEventTranslation",
      "isPictureTranslation",
      "validated",
    ];
    updatableFields.forEach((field) => {
      if (field in args.translationInput) {
        updateFields[field] = args.translationInput[field];
      }
    });
    try {
      const updatedTranslation = await Translation.update(updateFields, {
        where: {
          _id: args.translationId,
        },
        returning: true,
        plain: true,
      });
      // updatedTranslation[0]: number or row udpated
      // updatedTranslation[1]: rows updated
      return updatedTranslation[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteTranslation(translationId: ID!): Boolean!
  async deleteTranslation(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Translation.destroy({
      where: {
        _id: args.translationId,
      },
    });
    return true;
  },
};
