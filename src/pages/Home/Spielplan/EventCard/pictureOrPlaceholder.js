import { getPictureUrl } from "../../../../helpers/picture/getPictureUrl.js";
import eventPlaceholder from "../../../../img/artworks/eventPlaceholder.jpg";
import kitkatPlaceholder from "../../../../img/artworks/kitkatclub.png";
import insomniaPlaceholder from "../../../../img/artworks/insomniaberlin.jpg";
import symbiotikka from "../../../../img/artworks/symbiotikka.png";
import electricmonday from "../../../../img/artworks/electricmonday.png";

export function pictureOrPlaceholder(event) {
  if (event.pictures[0]) {
    return getPictureUrl(event.pictures[0], "events");
  } else if (event.externalPicture) {
    return event.externalPicture;
  } else if (event.location === 1 && event.title.toLowerCase().includes('symbiotikka')) {
    return symbiotikka;
  } else if (event.location === 1 && event.title.toLowerCase().includes('electric monday')) {
    return electricmonday;
  } else if (event.location === 1) {
    return kitkatPlaceholder;
  } else if (event.location === 8) {
    return insomniaPlaceholder;
  } else {
    return eventPlaceholder;
  }
}
