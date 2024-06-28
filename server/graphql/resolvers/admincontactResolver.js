import { Admincontact } from "../../models/Admincontact.js";
import { User } from "../../models/User.js";

export const admincontactResolver = {
  // getAllAdmincontacts
  async getAllAdmincontacts(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("ressources")) {
      throw new Error("Unauthorized!");
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
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("ressources")) {
      throw new Error("Unauthorized!");
    }
    try {
      const admincontact = new Admincontact({
        userId: req.userId,
        name: args.admincontactInput.name,
        email: args.admincontactInput.email,
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
      where: { id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("ressources")) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = ["name", "email", "details", "archived"];
    updatableFields.forEach((field) => {
      if (field in args.admincontactInput) {
        updateFields[field] = args.admincontactInput[field];
      }
    });
    try {
      const updatedAdmincontact = await Admincontact.update(updateFields, {
        where: {
          id: args.admincontactId,
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
        id: args.admincontactId,
      },
    });
    return true;
  },
};
