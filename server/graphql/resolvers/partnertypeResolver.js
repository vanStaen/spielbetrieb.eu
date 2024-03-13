import { Partnertype } from "../../models/Partnertype.js";
import { User } from "../../models/User.js";

export const partnertypeResolver = {
  // getPartnertypes
  async getPartnertypes(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Partnertype.findAll({
      order: [["_id", "ASC"]],
    });
  },

  // addPartnertype(partnertypeInput: PartnertypeInputData!): Partnertype!
  async addPartnertype(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("data")) {
      throw new Error("Unauthorized!");
    }
    try {
      const partnertype = new Partnertype({
        name: args.partnertypeInput.name,
      });
      return await partnertype.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updatePartnertype(partnertypeId: ID!, partnertypeInput: PartnertypeInputData!): Partnertype!
  async updatePartnertype(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("data")) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = ["name"];
    updatableFields.forEach((field) => {
      if (field in args.partnertypeInput) {
        updateFields[field] = args.partnertypeInput[field];
      }
    });
    try {
      const updatedPartnertype = await Partnertype.update(updateFields, {
        where: {
          _id: args.partnertypeId,
        },
        returning: true,
        plain: true,
      });
      // updatedPartnertype[0]: number or row udpated
      // updatedPartnertype[1]: rows updated
      return updatedPartnertype[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deletePartnertype(partnertypeId: ID!): Boolean!
  async deletePartnertype(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("data")) {
      throw new Error("Unauthorized!");
    }
    await Partnertype.destroy({
      where: {
        _id: args.partnertypeId,
      },
    });
    return true;
  },
};
