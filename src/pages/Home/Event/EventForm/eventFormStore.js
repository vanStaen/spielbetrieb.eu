import { ObservableMap, action, makeObservable, observable } from "mobx";

export class EventFormStore {
  eventId = null;
  artworks = [];
  artworksUrl = [];
  eventtype = null;
  eventtypeError = null;
  title = null;
  titleError = null;
  locationId = null;
  locationName = null;
  locationNameError = null;
  locationAddress = null;
  locationAddressError = null;
  locationCoordinates = null;
  description = null;
  descriptionError = null;
  fromDate = null;
  untilDate = null;
  fromDateError = null;

  constructor() {
    makeObservable(this, {
      eventId: observable,
      setEventId: action,
      artworks: observable,
      setArtworks: action,
      artworksUrl: observable,
      setArtworksUrl: action,
      eventtype: observable,
      setEventtype: action,
      eventtypeError: observable,
      setEventtypeError: action,
      title: observable,
      setTitle: action,
      titleError: observable,
      setTitleError: action,
      locationId: observable,
      setLocationId: action,
      locationName: observable,
      setLocationName: action,
      locationNameError: observable,
      setLocationNameError: action,
      locationAddress: observable,
      setLocationAddress: action,
      locationAddressError: observable,
      setLocationAddressError: action,
      locationCoordinates: observable,
      setlocationCoordinates: action,
      description: observable,
      setDescription: action,
      descriptionError: observable,
      setDescriptionError: action,
      fromDate: observable,
      setFromDate: action,
      untilDate: observable,
      setUntilDate: action,
      fromDateError: observable,
      setFromDateError: action,
    });
  }

  setEventId = (eventId) => {
    this.eventId = eventId;
  };

  setArtworks = (artworks) => {
    this.artworks = artworks;
  };

  setArtworksUrl = (artworksUrl) => {
    this.artworksUrl = artworksUrl;
  };

  setEventtype = (eventtype) => {
    this.eventtype = eventtype;
  };

  setEventtypeError = (eventtypeError) => {
    this.eventtypeError = eventtypeError;
  };

  setTitle = (title) => {
    this.title = title;
  };

  setTitleError = (titleError) => {
    this.titleError = titleError;
  };

  setLocationId = (locationId) => {
    this.locationId = locationId;
  };

  setLocationName = (locationName) => {
    this.locationName = locationName;
  };

  setLocationNameError = (locationNameError) => {
    this.locationNameError = locationNameError;
  };

  setLocationAddress = (locationAddress) => {
    this.locationAddress = locationAddress;
  };

  setLocationAddressError = (locationAddressError) => {
    this.locationAddressError = locationAddressError;
  };

  setlocationCoordinates = (locationCoordinates) => {
    this.locationCoordinates = locationCoordinates;
  };

  setDescription = (description) => {
    this.description = description;
  };

  setDescriptionError = (descriptionError) => {
    this.descriptionError = descriptionError;
  };

  setFromDate = (fromDate) => {
    this.fromDate = fromDate;
  };

  setUntilDate = (untilDate) => {
    this.untilDate = untilDate;
  };

  setFromDateError = (fromDateError) => {
    this.fromDateError = fromDateError;
  };
}

export const eventFormStore = new EventFormStore();
