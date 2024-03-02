const { User } = require("../../models/User");
const { Partner } = require("../../models/Partner");

exports.partnerResolver = {
  async getPartner(args, req) {
    return await Partner.findOne({
      where: { _id: args.partnerId },
      include: [User],
    });
  },

  async getAllPartners(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    return await Partner.findAll({
      order: [["_id", "ASC"]],
      include: [User],
    });
  },

  async addPartner(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    const foundPartnerName = await User.findOne({
      where: {
        foundPartnerName: args.partnerInput.name.toLowerCase(),
      },
    });
    if (foundPartnerName) {
      throw new Error(
        "This partner name is already associated with an account.",
      );
    }
    try {
      const partner = new User({
        name: args.partnerInput.name,
        partnertype: args.partnerInput.partnertype,
        partnerRoles: args.partnerInput.partnerRoles,
        lastActive: Date.now(),
      });
      return await partner.save();
    } catch (err) {
      console.log(err);
    }
  },

  // TODO: check that UserId is associated to Partner
  async updatePartner(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "description",
      "avatar",
      "pictures",
      "profilSettings",
      "archived",
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
          _id: args.partnerId,
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

  // updateUser(_id: ID!, userInput: UserInputData!): User!
  async updatePartnerAsAdmin(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "name",
      "description",
      "avatar",
      "pictures",
      "profilSettings",
      "reviews",
      "partnertype",
      "partnerRoles",
      "archived",
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
          _id: args.partnerId,
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

  async deletePartnerAsAdmin(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await Partner.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("users")) {
      throw new Error("Unauthorized!");
    }
    await Partner.destroy({
      where: {
        _id: args.partnerId,
      },
    });
    req.session = null;
    return true;
  },
};
