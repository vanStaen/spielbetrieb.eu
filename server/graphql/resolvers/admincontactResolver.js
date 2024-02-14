const { Admincontact } = require("../../models/Admincontact");
const { User } = require("../../models/User");
const { Op } = require("sequelize");

exports.admincontactResolver = {

  // getAllAdmincontacts
  async getAllAdmincontacts(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes('ressources')) {
      throw new Error('Unauthorized!');
    }
    return await Admincontact.findAll({
      include: User,
    });
  },
  
  // addAdmincontact(admincontactInput: AdmincontactInputData!): Admincontact!
  async addAdmincontact(args, req) {
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
      const admincontact = new Admincontact({
        userId: req.userId,
        name: args.admincontactInput.name,
        email: args.admincontactInput.emal,
        details: args.admincontactInput.details,
      });
      return await admincontact.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateAdmincontact(admincontactId: ID!, admincontactInput: AdmincontactInputData!): Admincontact!
  async updateAdmincontact(args, req) {
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
      "name",
      "email",
      "details",
      "archived",
    ];
    updatableFields.forEach((field) => {
      if (field in args.admincontactId) {
        updateFields[field] = args.admincontactId[field];
      }
    });
    try {
      const updatedAdmincontact = await Admincontact.update(updateFields, {
        where: {
          _id: args.admincontactId,
        },
        returning: true,
        plain: true,
      });
      // updatedEvent[0]: number or row udpated
      // updatedEvent[1]: rows updated
      return updatedAdmincontact[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteAdmincontact(admincontactId: ID!): Boolean!
  async deleteAdmincontact(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await Admincontact.destroy({
      where: {
        _id: args.admincontactId,
      },
    });
    return true;
  },
};
