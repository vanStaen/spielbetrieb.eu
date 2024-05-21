import { Event } from "../../../models/Event.js";

export default async function getEventByExternalId(id) {
  const result = await Event.findOne({
    where: {
      externalId: id,
    },
  });
  if (result) {
    return true;
  }
  return false;
}
