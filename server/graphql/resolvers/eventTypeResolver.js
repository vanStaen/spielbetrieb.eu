const { EventType } = require("../../models/EventType");
const { User } = require("../../models/User");

exports.eventTypeResolver = {
  //getEventTypes
  async getEventTypes(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await EventType.findAll({});
  },

  // addEventType(eventTypeInput: EventTypeInputData!): EventType!
  async addEventType(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin) {
      throw new Error('Unauthorized!');
    }
    try {
      const eventType = new EventType({
        name: args.eventTypeInput.name,
        validated: args.eventTypeInput.validated,
      });
      return await eventType.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateEventType(eventTypeId: ID!, eventTypeInput: EventTypeInputData!): EventType!
  async updateEventType(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin) {
      throw new Error('Unauthorized!');
    }
    const updateFields = [];
    const updatableFields = [
      "name",
      "validated",
    ];
    updatableFields.forEach((field) => {
      if (field in args.eventTypeInput) {
        updateFields[field] = args.eventTypeInput[field];
      }
    });
    try {
      const updatedEventType = await EventType.update(updateFields, {
        where: {
          _id: args.eventTypeId,
        },
        returning: true,
        plain: true,
      });
      // updatedEventType[0]: number or row udpated
      // updatedEventType[1]: rows updated
      return updatedEventType[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteEventType(eventTypeId: ID!): Boolean!
  async deleteEventType(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId }
    });
    if (!foundUser.isAdmin) {
      throw new Error('Unauthorized!');
    }
    await EventType.destroy({
      where: {
        _id: args.eventTypeId,
      },
    });
    return true;
  },
};
