import { Event } from "../../../models/Event.js";
import getEventByExternalId from "./getEventByExternalId.js";

export default async function insertEventIntoDB(dataObject) {
  try {
    const existAlready = await getEventByExternalId(dataObject.externalId);

    if (existAlready) {
      // TODO update instead of ignore
      return;
    }

    console.log("New Event", "id:", dataObject.externalId);

    const event = new Event({
      userId: 17, // Bot
      externalId: dataObject.externalId,
      externalPicture: dataObject.externalPicture,
      title: dataObject.title,
      description: dataObject.description,
      eventtype: dataObject.eventtype,
      pictures: dataObject.pictures,
      location: dataObject.location,
      locationName: dataObject.locationName,
      locationAddress: dataObject.locationAddress,
      locationCoordinates: dataObject.locationCoordinates,
      fromDate: dataObject.fromDate,
      untilDate: dataObject.untilDate,
      eventTags: dataObject.eventTags,
      hasDresscode: dataObject.hasDresscode,
      dresscodeDontTags: dataObject.dresscodeDontTags,
      prices: dataObject.prices,
      lineUp: dataObject.lineUp,
      equipment: dataObject.equipment,
      ageMin: dataObject.ageMin,
      currency: dataObject.currency,
      private: dataObject.private,
      links: dataObject.links,
      forwardable: dataObject.forwardable,
      allowAnonymous: dataObject.allowAnonymous,
      isDraft: true,
      isPartnerEvent: dataObject.isPartnerEvent,
      validated: false,
      admin: [17, 1],
    });
    return await event.save();
  } catch (err) {
    console.log(err);
  }
}
