import { Dresscode } from "../../models/Dresscode.js";
import { User } from "../../models/User.js";

export const dresscodeResolver = {
  // getDresscodes: [Dresscode]
  async getDresscodes() {
    return await Dresscode.findAll({
      order: [
        ["validated", "DESC"],
        ["name", "ASC"],
      ],
    });
  },

  // addDresscode(dresscodeInput: DresscodeInputData!): Dresscode!
  async addDresscode(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    let validated = args.dresscodeInput.validated;
    if (!foundUser.isAdmin) {
      validated = false;
    }
    try {
      const dresscode = new Dresscode({
        name: args.dresscodeInput.name,
        media: args.dresscodeInput.media,
        validated,
      });
      return await dresscode.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateDresscode(dresscodeId: ID!, dresscodeInput: DresscodeInputData!): Dresscode!
  async updateDresscode(args, req) {
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
    const updatableFields = ["name", "media", "validated"];
    updatableFields.forEach((field) => {
      if (field in args.dresscodeInput) {
        updateFields[field] = args.dresscodeInput[field];
      }
    });
    try {
      const updatedDresscode = await Dresscode.update(updateFields, {
        where: {
          _id: args.dresscodeId,
        },
        returning: true,
        plain: true,
      });
      // updatedDresscode[0]: number or row udpated
      // updatedDresscode[1]: rows updated
      return updatedDresscode[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteDresscode(dresscodeId: ID!): Boolean!
  async deleteDresscode(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Dresscode.destroy({
      where: {
        _id: args.dresscodeId,
      },
    });
    return true;
  },
};
