import isEqual from "lodash.isequal";

import { Event } from "../../../models/Event.js";
import getEventByExternalId from "./getEventByExternalId.js";

export default async function insertEventIntoDB(dataObject) {
  try {
    const existAlready = await getEventByExternalId(dataObject.externalId);

    if (existAlready) {
      const isNewValue = {};
      for (const [key, value] of Object.entries(dataObject)) {
        if (!isEqual(value, existAlready[key])) {
          isNewValue[key] = value;
        }
      }
      if (Object.keys(isNewValue).length) {
        isNewValue.validated = false;
        try {
          await Event.update(isNewValue, {
            where: {
              externalId: dataObject.externalId,
            },
          });
          console.log("Event updated", "id:", dataObject.externalId);
          return true;
        } catch (err) {
          console.log(err);
        }
      } else {
        // console.log("No changes: Event will be ignored");
      }
      return;
    }

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
      dresscodeDoTags: dataObject.dresscodeDoTags,
      prices: dataObject.prices,
      lineUp: dataObject.lineUp,
      equipment: dataObject.equipment,
      ageMin: dataObject.ageMin,
      currency: dataObject.currency,
      private: dataObject.private,
      links: dataObject.links,
      forwardable: dataObject.forwardable,
      allowAnonymous: dataObject.allowAnonymous,
      isPartnerEvent: dataObject.isPartnerEvent,
      isDraft: false,
      validated: false,
      admin: [17, 1],
    });

    console.log("New Event", "id:", dataObject.externalId);
    // TODO: notifications new events

    return await event.save();
  } catch (err) {
    console.log(err);
  }
}
