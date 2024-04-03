import { action, makeObservable, observable } from "mobx";

export class EventFormStore {
  artworks = [];

  constructor() {
    makeObservable(this, {
      artworks: observable,
      setArtworks: action,
    });
  }

  setArtworks = (artworks) => {
    this.artworks = artworks;
  };
}

export const eventFormStore = new EventFormStore();
