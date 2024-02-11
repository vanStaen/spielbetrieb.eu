const { Eventtype } = require("../../models/Eventtype");
const { User } = require("../../models/User");

exports.eventtypeResolver = {
  //getEventtypes
  async getEventtypes(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Eventtype.findAll({
      order: [
        ['_id', 'ASC'],
      ]
    });
  },

  // addEventtype(eventtypeInput: EventtypeInputData!): Eventtype!
  async addEventtype(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes('data')) {
      throw new Error('Unauthorized!');
    }
    try {
      const eventtype = new Eventtype({
        name: args.eventtypeInput.name,
        validated: args.eventtypeInput.validated,
      });
      return await eventtype.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateEventtype(eventtypeId: ID!, eventtypeInput: EventtypeInputData!): Eventtype!
  async updateEventtype(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes('data')) {
      throw new Error('Unauthorized!');
    }
    const updateFields = [];
    const updatableFields = [
      "name",
      "validated",
    ];
    updatableFields.forEach((field) => {
      if (field in args.eventtypeInput) {
        updateFields[field] = args.eventtypeInput[field];
      }
    });
    try {
      const updatedEventtype = await Eventtype.update(updateFields, {
        where: {
          _id: args.eventtypeId,
        },
        returning: true,
        plain: true,
      });
      // updatedEventtype[0]: number or row udpated
      // updatedEventtype[1]: rows updated
      return updatedEventtype[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteEventtype(eventtypeId: ID!): Boolean!
  async deleteEventtype(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes('data')) {
      throw new Error('Unauthorized!');
    }
    await Eventtype.destroy({
      where: {
        _id: args.eventtypeId,
      },
    });
    return true;
  },
};