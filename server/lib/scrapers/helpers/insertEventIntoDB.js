import isEqual from "lodash.isequal";

import { Event } from "../../../models/Event.js";
import { notificationService } from "../../../api/service/notificationService.js";
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
      delete isNewValue.validated;
      if (Object.keys(isNewValue).length) {
        try {
          await Event.update(isNewValue, {
            where: {
              externalId: dataObject.externalId,
            },
          });
          console.log("Event updated", "id:", dataObject.externalId);
          console.log("--> New value(s):", isNewValue);

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
      userId: 17, // Spielbetrieb
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
      isDraft: false,
      validated: dataObject.validated,
      admin: [17, 1],
    });

    const newEvent = await event.save();
    console.log("New Event", "id:", dataObject.externalId);
    notificationService.createNotificationForAdmin(
      "events",
      91,
      newEvent.name,
      newEvent.id,
    );
    return newEvent;
  } catch (err) {
    console.log(err);
  }
}
