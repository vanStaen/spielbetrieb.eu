import { Op } from "sequelize";
import { Event } from "../../models/Event.js";
import { User } from "../../models/User.js";
import dayjs from "dayjs";

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
      order: [["_id", "ASC"]],
    });
  },

  // getAllDraftEvents
  async getAllDraftEvents(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Event.findAll({
      where: {
        userId: req.userId,
        isDraft: true,
        archived: { [Op.or]: [false, null] },
      },
      order: [["_id", "ASC"]],
    });
  },

  // getAllPublicEvents
  async getAllPublicEvents(args, req) {
    // Be sure to not filter out the event of the day, even if they have started yet
    let fromDate = dayjs(args.fromDate).startOf("day").valueOf();
    const untilDate = dayjs(args.untilDate).endOf("day").valueOf();
    if (args.fromDate < dayjs().valueOf()) {
      fromDate = dayjs().startOf("day").valueOf();
    }
    //console.log(args.fromDate, fromDate);
    //console.log(args.untilDate, untilDate);
    return await Event.findAll({
      where: {
        private: false,
        isDraft: false,
        validated: true,
        archived: { [Op.or]: [false, null] },
        fromDate: {
          [Op.between]: [fromDate, untilDate],
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
        hasDresscode: args.eventInput.hasDresscode,
        dresscodeDontTags: args.eventInput.dresscodeDontTags,
        prices: args.eventInput.prices,
        lineUp: args.eventInput.lineUp,
        equipment: args.eventInput.equipment,
        ageMin: args.eventInput.ageMin,
        currency: args.eventInput.currency,
        private: args.eventInput.private,
        links: args.eventInput.links,
        forwardable: args.eventInput.forwardable,
        allowAnonymous: args.eventInput.allowAnonymous,
        isDraft: args.eventInput.isDraft,
        isPartnerEvent: args.eventInput.isPartnerEvent,
        validated: args.eventInput.validated,
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
      "hasDresscode",
      "dresscodeDoTags",
      "dresscodeDontTags",
      "prices",
      "lineUp",
      "equipment",
      "ageMin",
      "attendees",
      "invited",
      "links",
      "admin",
      "private",
      "forwardable",
      "allowAnonymous",
      "isDraft",
      "isPartnerEvent",
      "validated",
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

  // archiveEvent(id: ID!): Boolean!
  async archiveEvent(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await Event.update(
      { archived: true },
      {
        where: {
          _id: args.eventId,
        },
        returning: true,
        plain: true,
      },
    );
    return true;
  },

  // deleteEvent(id: ID!): Boolean!
  async deleteEvent(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundUser = await User.findOne({
      where: { _id: req.userId },
    });
    if (!foundUser.isAdmin || !foundUser.adminRoles.includes("events")) {
      throw new Error("Unauthorized!");
    }
    // TODO : Delete all event pictures
    await Event.destroy({
      where: {
        _id: args.eventId,
      },
    });
    return true;
  },
};
