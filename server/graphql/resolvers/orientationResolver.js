import { Orientation } from "../../models/Orientation.js";
import { User } from "../../models/User.js";

export const orientationResolver = {
  // getOrientations: [Orientation]
  async getOrientations() {
    return await Orientation.findAll({
      order: [["id", "ASC"]],
    });
  },

  // addOrientation(orientationInput: OrientationInputData!): Orientation!
  async addOrientation(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    let validated = args.orientationInput.validated;
    if (!foundUser.isAdmin) {
      validated = false;
    }
    try {
      const orientation = new Orientation({
        name: args.orientationInput.name,
        validated,
      });
      return await orientation.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateOrientation(orientationId: ID!, orientationInput: OrientationInputData!): Orientation!
  async updateOrientation(args, req) {
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
    const updatableFields = ["name", "validated"];
    updatableFields.forEach((field) => {
      if (field in args.orientationInput) {
        updateFields[field] = args.orientationInput[field];
      }
    });
    try {
      const updatedOrientation = await Orientation.update(updateFields, {
        where: {
          id: args.orientationId,
        },
        returning: true,
        plain: true,
      });
      // updatedOrientation[0]: number or row udpated
      // updatedOrientation[1]: rows updated
      return updatedOrientation[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteOrientation(orientationId: ID!): Boolean!
  async deleteOrientation(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Orientation.destroy({
      where: {
        id: args.orientationId,
      },
    });
    return true;
  },
};
