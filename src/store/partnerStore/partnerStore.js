import { action, makeObservable, observable } from "mobx";
import { getPartnerByUserName } from './getPartnerByUserName.js';

export class PartnerStore {
  isLoading = true;
  error = null;
  id = null;
  avatar = null;
  avatarUrl = null;
  userName = null;
  name = null;
  description = null;
  pictures = [];
  settings = [];
  reviews = [];
  lastActive = null;
  partnerRoles = [];
  partnertypeId = null;
  links = [];
  partnerTags = [];
  archived = null;
  suspended = null;
  pending = null;
  admin = [];

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
      error: observable,
      setError: action,
      id: observable,
      setid: action,
      avatarUrl: observable,
      setAvatarUrl: action,
      userName: observable,
      setUserName: action,
      name: observable,
      setName: action,
      description: observable,
      setDescription: action,
      pictures: observable,
      setPictures: action,
      settings: observable,
      setSettings: action,
      reviews: observable,
      setReviews: action,
      lastActive: observable,
      setLastActive: action,
      partnerRoles: observable,
      setPartnerRoles: action,
      partnertypeId: observable,
      setPartnertypeId: action,
      links: observable,
      setLinks: action,
      partnerTags: observable,
      setPartnerTags: action,
      archived: observable,
      setArchived: action,
      suspended: observable,
      setSuspended: action,
      pending: observable,
      setPending: action,
      admin: observable,
      setAdmin: action,
      fetchPartnerData: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setError = (error) => {
    this.error = error;
  };

  setid = (id) => {
    this.id = id;
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  setAvatarUrl = (avatarUrl) => {
    this.avatarUrl = avatarUrl;
  };

  setUserName = (userName) => {
    this.userName = userName;
  };

  setName = (name) => {
    this.name = name;
  };

  setDescription = (description) => {
    this.description = description;
  };

  setPictures = (pictures) => {
    this.pictures = pictures;
  };

  setSettings = (settings) => {
    this.settings = settings;
  };

  setReviews = (reviews) => {
    this.reviews = reviews;
  };

  setLastActive = (lastActive) => {
    this.lastActive = lastActive;
  };

  setPartnerRoles = (partnerRoles) => {
    this.partnerRoles = partnerRoles;
  };

  setPartnertypeId = (partnertypeId) => {
    this.partnertypeId = partnertypeId;
  };

  setLinks = (links) => {
    this.links = links;
  };

  setPartnerTags = (partnerTags) => {
    this.partnerTags = partnerTags;
  };

  setArchived = (archived) => {
    this.archived = archived;
  };

  setSuspended = (suspended) => {
    this.suspended = suspended;
  };

  setPending = (pending) => {
    this.pending = pending;
  };

  setAdmin = (admin) => {
    this.admin = admin;
  };

  fetchPartnerData = async (userName, loader = true) => {
    try {
      if (loader) {
        this.setIsLoading(true);
      }
      if (userName) {
        this.setUserName(userName);
        const partnerData = await getPartnerByUserName(userName);
        if (partnerData) {
          console.log(partnerData);
          this.setid(parseInt(partnerData.id));
          this.setAvatar(partnerData.avatar);
          this.setName(partnerData.name);
          this.setLastActive(partnerData.lastActive);
          this.setSettings(JSON.parse(partnerData.settings));
          this.setPictures(partnerData.pictures);
          this.setReviews(partnerData.reviews);
          this.setPartnerTags(partnerData.partnerTags);
          this.setLinks(partnerData.links);
          this.setPending(partnerData.pending);
          this.setPartnertypeId(parseInt(partnerData.partnertype));
          /* let [events, partners] = await Promise.all([
            getProfileEvents(profileData.id),
            getProfilePartners(profileData.id),
          ]);
          events && this.setEvents(events);
          partners && this.setPartners(partners); */
        }
        this.setError(null);
      }
    } catch (error) {
      this.setError(error);
      console.error(error);
    }
    this.setIsLoading(false);
  };
}

export const partnerStore = new PartnerStore();
