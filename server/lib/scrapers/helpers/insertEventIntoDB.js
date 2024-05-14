import { Event } from "../../../models/Event.js";

export default async function insertEventIntoDB(dataObject) {
  const addEvent = async () => {
    try {
      const event = new Event({
        userId: 17, // Bot
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
  };

  console.log(dataObject);
}
