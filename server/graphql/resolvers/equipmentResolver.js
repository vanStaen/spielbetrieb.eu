import { Equipment } from "../../models/Equipment.js";
import { User } from "../../models/User.js";

export const equipmentResolver = {
  // getEquipments: [Equipment]
  async getEquipments() {
    return await Equipment.findAll({
      order: [["name", "ASC"]],
    });
  },

  // addEquipment(equipmentInput: EquipmentInputData!): Equipment!
  async addEquipment(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    let validated = args.equipmentInput.validated;
    if (!foundUser.isAdmin) {
      validated = false;
    }
    try {
      const equipment = new Equipment({
        name: args.equipmentInput.name,
        media: args.equipmentInput.media,
        validated,
      });
      return await equipment.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateEquipment(equipmentId: ID!, equipmentInput: EquipmentInputData!): Equipment!
  async updateEquipment(args, req) {
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
      if (field in args.equipmentInput) {
        updateFields[field] = args.equipmentInput[field];
      }
    });
    try {
      const updatedEquipment = await Equipment.update(updateFields, {
        where: {
          _id: args.equipmentId,
        },
        returning: true,
        plain: true,
      });
      // updatedEquipment[0]: number or row udpated
      // updatedEquipment[1]: rows updated
      return updatedEquipment[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteEquipment(equipmentId: ID!): Boolean!
  async deleteEquipment(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin) {
      throw new Error("Unauthorized!");
    }
    await Equipment.destroy({
      where: {
        _id: args.equipmentId,
      },
    });
    return true;
  },
};
