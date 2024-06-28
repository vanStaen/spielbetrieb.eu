import { Translation } from "../../models/Translation.js";
import { User } from "../../models/User.js";
import { createTranslationFiles } from "../../lib/translations/createTranslationFiles.js";

export const translationResolver = {
  // getTranslations: [Translation]
  async getTranslations() {
    return await Translation.findAll({
      order: [["id", "ASC"]],
    });
  },

  // addTranslation(translationInput: TranslationInputData!): Translation!
  async addTranslation(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    try {
      const translation = new Translation({
        category: args.translationInput.category,
        key: args.translationInput.key,
        en: args.translationInput.en,
        de: args.translationInput.de,
        fr: args.translationInput.fr,
        ru: args.translationInput.ru,
        es: args.translationInput.es,
      });
      createTranslationFiles();
      const result = await translation.save();
      return result;
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
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = ["category", "key", "en", "de", "fr", "es", "ru"];
    updatableFields.forEach((field) => {
      if (field in args.translationInput) {
        updateFields[field] = args.translationInput[field];
      }
    });
    try {
      const updatedTranslation = await Translation.update(updateFields, {
        where: {
          id: args.translationId,
        },
        returning: true,
        plain: true,
      });
      // updatedTranslation[0]: number or row udpated
      // updatedTranslation[1]: rows updated
      createTranslationFiles();
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
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Translation.destroy({
      where: {
        id: args.translationId,
      },
    });
    return true;
  },
};
