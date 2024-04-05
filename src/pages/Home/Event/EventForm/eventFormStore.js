import { action, makeObservable, observable } from "mobx";

export class EventFormStore {
  artworks = [];
  artworksUrl = [];
  eventtype = null;
  title = null;

  constructor() {
    makeObservable(this, {
      artworks: observable,
      setArtworks: action,
      artworksUrl: observable,
      setArtworksUrl: action,
      eventtype: observable,
      setEventtype: action,
      title: observable,
      setTitle: action,
    });
  }

  setArtworks = (artworks) => {
    this.artworks = artworks;
  };

  setArtworksUrl = (artworksUrl) => {
    this.artworksUrl = artworksUrl;
  };

  setEventtype = (eventtype) => {
    this.eventtype = eventtype;
  };

  setTitle = (title) => {
    this.title = title;
  };
}

export const eventFormStore = new EventFormStore();
