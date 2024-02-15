const { Adminlink } = require("../../models/Adminlink");
const { User } = require("../../models/User");
const { Op } = require("sequelize");

exports.adminlinkResolver = {

  // getAllAdminlinks
  async getAllAdminlinks(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes('ressources')) {
      throw new Error('Unauthorized!');
    }
    return await Adminlink.findAll({
      include: User,
    });
  },
  
  // addAdminlink(adminlinkInput: AdminlinkInputData!): Adminlink!
  async addAdminlink(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes('ressources')) {
      throw new Error('Unauthorized!');
    }
    try {
      const adminlink = new Adminlink({
        userId: req.userId,
        shortDesc: args.adminlinkInput.shortDesc,
        category: args.adminlinkInput.category,
        link: args.adminlinkInput.link,
      });
      return await adminlink.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateAdminlink(adminlinkId: ID!, adminlinkInput: AdminlinkInputData!): Adminlink!
  async updateAdminlink(args, req) {
    console.log("args", args);
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes('ressources')) {
      throw new Error('Unauthorized!');
    }
    const updateFields = [];
    const updatableFields = [
      "shortDesc",
      "category",
      "link",
      "archived",
    ];
    updatableFields.forEach((field) => {
      if (field in args.adminlinkInput) {
        updateFields[field] = args.adminlinkInput[field];
      }
    });
    console.log("updateFields", updateFields);
    try {
      const updatedAdminlink = await Adminlink.update(updateFields, {
        where: {
          _id: args.adminlinkId,
        },
        returning: true,
        plain: true,
      });
      // updatedEvent[0]: number or row udpated
      // updatedEvent[1]: rows updated
      return updatedAdminlink[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteAdminlink(adminlinkId: ID!): Boolean!
  async deleteAdminlink(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await Adminlink.destroy({
      where: {
        _id: args.adminlinkId,
      },
    });
    return true;
  },
};
