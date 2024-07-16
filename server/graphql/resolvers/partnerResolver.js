import { User } from "../../models/User.js";
import { Partner } from "../../models/Partner.js";
import { Op } from "sequelize";

export const partnerResolver = {
  // getPartnerById(partnerId: Int): Partner
  async getPartnerById(args, _) {
    return await Partner.findOne({
      where: { id: args.partnerId },
    });
  },

  // getPartnerByUserName(partnerUserName: String): Partner
  async getPartnerByUserName(args, _) {
    return await Partner.findOne({
      where: { userName: args.partnerUserName },
    });
  },

  // getAllPartners: [Partner]
  async getAllPartners(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("partners")) {
      throw new Error("Unauthorized!");
    }
    return await Partner.findAll({
      order: [["id", "ASC"]],
    });
  },

  // addPartner(partnerInput: PartnerInputData!): Partner!
  async addPartner(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const username = args.partnerInput.name.replaceAll(" ", "").toLowerCase();
    const foundPartnerName = await Partner.findOne({
      where: {
        name: { [Op.iLike]: args.partnerInput.name },
      },
    });
    const foundPartnerUserName = await Partner.findOne({
      where: {
        userName: { [Op.iLike]: username },
      },
    });
    if (foundPartnerName || foundPartnerUserName) {
      throw new Error("There is already a partner with this name.");
    }
    try {
      const partner = new Partner({
        name: args.partnerInput.name,
        userName: username,
        description: args.partnerInput.description,
        avatar: args.partnerInput.avatar,
        partnertype: args.partnerInput.partnertype,
        pending: true,
        admin: [req.userId],
        lastActive: Date.now(),
      });
      return await partner.save();
      // TODO: Create admin notification partner pending
    } catch (err) {
      console.log(err);
    }
  },

  // updatePartner(partnerId: ID!, partnerInput: PartnerInputData!): Partner!
  async updatePartner(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "name",
      "description",
      "avatar",
      "pictures",
      "settings",
      "reviews",
      "links",
      "partnerTags",
      "archived",
      "admin",
    ];
    updatableFields.forEach((field) => {
      if (field in args.partnerInput) {
        updateFields[field] = args.partnerInput[field];
      }
    });
    try {
      const updatedPartner = await Partner.update(updateFields, {
        where: {
          id: args.partnerId,
        },
        returning: true,
        plain: true,
      });
      // updatedPartner[0]: number or row udpated
      // updatedPartner[1]: rows updated
      return updatedPartner[1];
    } catch (err) {
      console.log(err);
    }
  },

  // TODO: Move avatar from temp to partner if pending is move from true to false
  // --> extra mutation?

  // updatePartnerAsAdmin(partnerId: ID!, partnerInput: PartnerInputDataAdmin!): Partner!
  async updatePartnerAsAdmin(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("partners")) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "name",
      "description",
      "avatar",
      "pictures",
      "settings",
      "reviews",
      "partnertype",
      "links",
      "partnerTags",
      "archived",
      "admin",
      "partnerRoles",
      "suspended",
      "pending",
    ];
    updatableFields.forEach((field) => {
      if (field in args.partnerInput) {
        updateFields[field] = args.partnerInput[field];
      }
    });
    try {
      const updatedPartner = await Partner.update(updateFields, {
        where: {
          id: args.partnerId,
        },
        returning: true,
        plain: true,
      });
      // updatedPartner[0]: number or row udpated
      // updatedPartner[1]: rows updated
      return updatedPartner[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deletePartnerAsAdmin(partnerId: ID!): Boolean!
  async deletePartnerAsAdmin(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("partners")) {
      throw new Error("Unauthorized!");
    }
    await Partner.destroy({
      where: {
        id: args.partnerId,
      },
    });
    return true;
  },
};
