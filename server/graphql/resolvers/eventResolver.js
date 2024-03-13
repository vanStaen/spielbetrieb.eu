import { Op } from "sequelize";
import { Event } from "../../models/Event.js";
import { User } from "../../models/User.js";

export const eventResolver = {
  // getEvent
  async getEvent(args, req) {
    return await Event.findOne({
      where: {
        _id: args.eventId,
      },
      include: User,
    });
  },

  // getAllEvents
  async getAllEvents(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("events")) {
      throw new Error("Unauthorized!");
    }
    return await Event.findAll({
      include: User,
    });
  },

  // getAllPublicEvents
  async getAllPublicEvents(args, req) {
    return await Event.findAll({
      where: {
        private: false,
        isDraft: false,
        fromDate: {
          [Op.between]: [args.fromDate, args.untilDate],
        },
      },
      include: User,
      order: [["fromDate", "ASC"]],
    });
  },

  // addEvent(eventInput: EventInputData!): Event!
  async addEvent(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const event = new Event({
        userId: req.userId,
        title: args.eventInput.title,
        description: args.eventInput.description,
        eventtype: args.eventInput.eventtype,
        pictures: args.eventInput.pictures,
        location: args.eventInput.location,
        locationName: args.eventInput.locationName,
        locationAddress: args.eventInput.locationAddress,
        locationCoordinates: args.eventInput.locationCoordinates,
        fromDate: args.eventInput.fromDate,
        untilDate: args.eventInput.untilDate,
        eventTags: args.eventInput.eventTags,
        private: args.eventInput.private,
        links: args.eventInput.links,
        forwardable: args.eventInput.forwardable,
        allowAnonymous: args.eventInput.allowAnonymous,
        isDraft: args.eventInput.isDraft,
        isPartnerEvent: args.eventInput.isPartnerEvent,
        admin: [req.userId],
      });
      return await event.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateEvent(eventInput: EventInputData!): Event!
  async updateEvent(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "eventtype",
      "title",
      "description",
      "pictures",
      "location",
      "locationName",
      "locationAddress",
      "locationCoordinates",
      "fromDate",
      "untilDate",
      "eventTags",
      "attendees",
      "invited",
      "links",
      "admin",
      "private",
      "forwardable",
      "allowAnonymous",
      "isDraft",
      "isPartnerEvent",
    ];
    updatableFields.forEach((field) => {
      if (field in args.eventInput) {
        updateFields[field] = args.eventInput[field];
      }
    });
    try {
      const updatedEvent = await Event.update(updateFields, {
        where: {
          _id: args.eventId,
        },
        returning: true,
        plain: true,
      });
      // updatedEvent[0]: number or row udpated
      // updatedEvent[1]: rows updated
      return updatedEvent[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteEvent(id: ID!): Boolean!
  async deleteEvent(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await Event.destroy({
      where: {
        _id: args.eventId,
      },
    });
    return true;
  },
};
