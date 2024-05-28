import { getPictureUrl } from "../../../../helpers/picture/getPictureUrl.js";
import eventPlaceholder from "../../../../img/artworks/eventPlaceholder.jpg";
import kitkatPlaceholder from "../../../../img/artworks/kitkatclub.png";
import insomniaPlaceholder from "../../../../img/artworks/insomniaberlin.jpg";

export function pictureOrPlaceholder(event) {
  if (event.pictures[0]) {
    return getPictureUrl(event.pictures[0], "events");
  } else if (event.externalPicture) {
    return event.externalPicture;
  } else if (event.location === 1) {
    return kitkatPlaceholder;
  } else if (event.location === 8) {
    return insomniaPlaceholder;
  } else {
    return eventPlaceholder;
  }
}
