import { action, makeObservable, observable } from "mobx";
import { updateEvent } from "../../../Admin/AdminEvents/updateEvent.js";

export class EventFormStore {
  formStep = 0;
  errors = false;
  eventId = null;
  artworks = [];
  artworksUrl = [];
  artworksError = null;
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
  isNewLocation = false;
  ageMin = 0;
  isPrivate = false;
  forwardable = true;
  eventTags = [];
  prices = [{ amount: null, option: 0 }];
  lineUp = [];
  equipment = [];
  dresscodeDontTags = [];
  dresscodeDoTags = [];
  hasDresscode = 0;
  dresscodeErrors = null;
  links = [];
  deactivateNav = false;
  showDraftModal = false;

  constructor() {
    makeObservable(this, {
      formStep: observable,
      setFormStep: action,
      errors: observable,
      setErrors: action,
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
      isNewLocation: observable,
      setIsNewLocation: action,
      ageMin: observable,
      setAgeMin: action,
      isPrivate: observable,
      setIsPrivate: action,
      forwardable: observable,
      setForwardable: action,
      eventTags: observable,
      setEventTags: action,
      prices: observable,
      setPrices: action,
      lineUp: observable,
      setLineUp: action,
      equipment: observable,
      setEquipment: action,
      hasDresscode: observable,
      setHasDresscode: action,
      dresscodeDoTags: observable,
      setDresscodeDoTags: action,
      dresscodeDontTags: observable,
      dresscodeErrors: observable,
      setDresscodeErrors: action,
      setDresscodeDontTags: action,
      artworksError: observable,
      setArtworksError: action,
      links: observable,
      setLinks: action,
      deactivateNav: observable,
      setDeactivateNav: action,
      resetEventForm: action,
      showDraftModal: observable,
      setShowDraftModal: action,
    });
  }

  setFormStep = (formStep) => {
    this.formStep = formStep;
  };

  setErrors = (errors) => {
    this.errors = errors;
  };

  setEventId = (eventId) => {
    this.eventId = eventId;
  };

  setArtworks = (artworks) => {
    this.artworks = artworks;
    this.eventId && updateEvent(this.eventId, { pictures: artworks });
  };

  setArtworksUrl = (artworksUrl) => {
    this.artworksUrl = artworksUrl;
  };

  setArtworksError = (artworksError) => {
    this.artworksError = artworksError;
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

  setIsNewLocation = (isNewLocation) => {
    this.isNewLocation = isNewLocation;
  };

  setAgeMin = (ageMin) => {
    this.ageMin = ageMin;
  };

  setForwardable = (forwardable) => {
    this.forwardable = forwardable;
  };

  setIsPrivate = (isPrivate) => {
    this.isPrivate = isPrivate;
  };

  setEventTags = (eventTags) => {
    this.eventTags = eventTags;
  };

  setPrices = (prices) => {
    this.prices = prices;
  };

  setLineUp = (lineUp) => {
    this.lineUp = lineUp;
  };

  setEquipment = (equipment) => {
    this.equipment = equipment;
  };

  setHasDresscode = (hasDresscode) => {
    this.hasDresscode = hasDresscode;
  };

  setDresscodeDoTags = (dresscodeDoTags) => {
    this.dresscodeDoTags = dresscodeDoTags;
  };

  setDresscodeDontTags = (dresscodeDontTags) => {
    this.dresscodeDontTags = dresscodeDontTags;
  };

  setDresscodeErrors = (dresscodeErrors) => {
    this.dresscodeErrors = dresscodeErrors;
  };

  setLinks = (links) => {
    this.links = links;
  };

  setDeactivateNav = (deactivateNav) => {
    this.deactivateNav = deactivateNav;
  };

  setShowDraftModal = (showDraftModal) => {
    this.showDraftModal = showDraftModal;
  };

  resetEventForm = () => {
    this.eventId = null;
    this.artworks = [];
    this.artworksUrl = [];
    this.artworksError = null;
    this.eventtype = null;
    this.eventtypeError = null;
    this.title = null;
    this.titleError = null;
    this.locationId = null;
    this.locationName = null;
    this.locationNameError = null;
    this.locationAddress = null;
    this.locationAddressError = null;
    this.locationCoordinates = null;
    this.description = null;
    this.descriptionError = null;
    this.fromDate = null;
    this.untilDate = null;
    this.fromDateError = null;
    this.isNewLocation = false;
    this.ageMin = 0;
    this.isPrivate = false;
    this.forwardable = true;
    this.eventTags = [];
    this.prices = [{ amount: null, option: 0 }];
    this.lineUp = [];
    this.equipment = [];
    this.dresscodeDontTags = [];
    this.dresscodeDoTags = [];
    this.hasDresscode = 0;
    this.dresscodeErrors = null;
    this.links = [];
  };
}

export const eventFormStore = new EventFormStore();
