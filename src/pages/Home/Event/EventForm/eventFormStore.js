import { action, makeObservable, observable } from "mobx";

export class EventFormStore {
  artworks = [];
  artworksUrl = [];

  constructor() {
    makeObservable(this, {
      artworks: observable,
      setArtworks: action,
      artworksUrl: observable,
      setArtworksUrl: action,
    });
  }

  setArtworks = (artworks) => {
    this.artworks = artworks;
  };

  setArtworksUrl = (artworksUrl) => {
    this.artworksUrl = artworksUrl;
  };
}

export const eventFormStore = new EventFormStore();
