import { Gender } from "../../models/Gender.js";
import { User } from "../../models/User.js";

export const genderResolver = {
  // getGenders: [Gender]
  async getGenders() {
    return await Gender.findAll({
      order: [["_id", "ASC"]],
    });
  },

  // addGender(genderInput: GenderInputData!): Gender!
  async addGender(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    let validated = args.genderInput.validated;
    if (!foundUser.isAdmin) {
      validated = false;
    }
    try {
      const gender = new Gender({
        name: args.genderInput.name,
        validated,
      });
      return await gender.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateGender(genderId: ID!, genderInput: GenderInputData!): Gender!
  async updateGender(args, req) {
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
    const updatableFields = ["name", "validated"];
    updatableFields.forEach((field) => {
      if (field in args.genderInput) {
        updateFields[field] = args.genderInput[field];
      }
    });
    try {
      const updatedGender = await Gender.update(updateFields, {
        where: {
          _id: args.genderId,
        },
        returning: true,
        plain: true,
      });
      // updatedGender[0]: number or row udpated
      // updatedGender[1]: rows updated
      return updatedGender[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteGender(genderId: ID!): Boolean!
  async deleteGender(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Gender.destroy({
      where: {
        _id: args.genderId,
      },
    });
    return true;
  },
};
