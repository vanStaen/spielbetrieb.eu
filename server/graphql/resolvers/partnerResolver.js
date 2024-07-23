import { User } from "../../models/User.js";
import { Partner } from "../../models/Partner.js";
import { Op } from "sequelize";
import { notificationService } from "../../api/service/notificationService.js";
import { copyFileFromS3 } from "../../lib/S3/copyFileFromS3.js";
import { deleteFileFromS3 } from "../../lib/S3/deleteFileFromS3.js";

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
      const newPartner = await partner.save();
      notificationService.createNotificationForAdmin(
        "partners",
        92,
        newPartner.name,
        newPartner.id,
      );
      return newPartner;
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

  // updatePendingPartner(partnerId: ID!): Partner!
  async updatePendingPartner(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("partners")) {
      throw new Error("Unauthorized!");
    }
    const foundPartner = await Partner.findOne({
      where: { id: args.partnerId },
    });
    try {
      await copyFileFromS3(foundPartner.avatar, "temp", "partners");
      await deleteFileFromS3(foundPartner.avatar, "temp");
      const updatedPartner = await Partner.update(
        {
          pending: false,
        },
        {
          where: {
            id: args.partnerId,
          },
          returning: true,
          plain: true,
        },
      );
      return updatedPartner[1];
    } catch (err) {
      console.log(err);
    }
  },

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
      if (
        updatedPartner[1]._previousDataValues.pending === true &&
        updatedPartner[1].dataValues.pending === false
      ) {
        const partnerId = updatedPartner[1].dataValues.id;
        notificationService.deleteNotificationForAdmin(92, partnerId);
      }
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
    notificationService.deleteNotificationForAdmin(92, args.partnerId);
    return true;
  },
};
