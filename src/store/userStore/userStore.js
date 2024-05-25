import { action, makeObservable, observable } from "mobx";

import { getUserInfo } from "./getUserInfo.js";
import { updateSettings } from "./updateSettings.js";
import defaultEmailSettings from "./defaultEmailSettings.json";
import defaultProfilSettings from "./defaultProfilSettings.json";

export class UserStore {
  isLoading = true;
  isAdmin = false;
  adminRoles = [];
  isPartner = false;
  partnerRoles = [];
  email = null;
  firstName = null;
  lastName = null;
  userName = null;
  description = null;
  avatar = null;
  emailSettings = null;
  profilSettings = null;
  verifiedIdentity = null;
  gender = null;
  orientation = null;
  wishes = null;
  interests = null;
  lastActive = null;
  archived = null;
  usernameChange = null;
  language = null;
  friends = [];
  followers = [];
  following = [];
  comments = [];
  events = [];
  messages = [];
  notifications = [];
  photos = [];
  visitors = [];
  _id = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
      isAdmin: observable,
      setIsAdmin: action,
      adminRoles: observable,
      setAdminRoles: action,
      isPartner: observable,
      setIsPartner: action,
      partnerRoles: observable,
      setPartnerRoles: action,
      email: observable,
      setEmail: action,
      firstName: observable,
      setFirstName: action,
      lastName: observable,
      setLastName: action,
      userName: observable,
      setUserName: action,
      description: observable,
      setDescription: action,
      avatar: observable,
      setAvatar: action,
      emailSettings: observable,
      setEmailSettings: action,
      profilSettings: observable,
      setProfilSettings: action,
      verifiedIdentity: observable,
      setVerifiedIdentity: action,
      language: observable,
      setLanguage: action,
      gender: observable,
      setGender: action,
      orientation: observable,
      setOrientation: action,
      wishes: observable,
      setWishes: action,
      interests: observable,
      setInterests: action,
      lastActive: observable,
      setLastActive: action,
      archived: observable,
      setArchived: action,
      usernameChange: observable,
      setUsernameChange: action,
      comments: observable,
      setComments: action,
      events: observable,
      setEvents: action,
      messages: observable,
      setMessages: action,
      notifications: observable,
      setNotifications: action,
      photos: observable,
      setPhotos: action,
      visitors: observable,
      setVisitors: action,
      friends: observable,
      setFriends: action,
      followers: observable,
      setFollowers: action,
      following: observable,
      setFollowing: action,
      _id: observable,
      set_id: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  set_id = (_id) => {
    this._id = _id;
  };

  setIsAdmin = (isAdmin) => {
    this.isAdmin = isAdmin;
  };

  setAdminRoles = (adminRoles) => {
    this.adminRoles = adminRoles;
  };

  setIsPartner = (isPartner) => {
    this.isPartner = isPartner;
  };

  setPartnerRoles = (partnerRoles) => {
    this.partnerRoles = partnerRoles;
  };

  setEmail = (email) => {
    this.email = email;
  };

  setUserName = (userName) => {
    this.userName = userName;
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  setDescription = (description) => {
    this.description = description;
  };

  setFirstName = (firstName) => {
    this.firstName = firstName;
  };

  setLastName = (lastName) => {
    this.lastName = lastName;
  };

  setEmailSettings = (emailSettings) => {
    this.emailSettings = emailSettings;
  };

  setProfilSettings = (profilSettings) => {
    this.profilSettings = profilSettings;
  };

  setLanguage = (language) => {
    this.language = language;
  };

  setGender = (gender) => {
    this.gender = gender;
  };

  setOrientation = (orientation) => {
    this.orientation = orientation;
  };

  setWishes = (wishes) => {
    this.wishes = wishes;
  };

  setInterests = (interests) => {
    this.interests = interests;
  };

  setFriends = (friends) => {
    this.friends = friends;
  };

  setVerifiedIdentity = (verifiedIdentity) => {
    this.verifiedIdentity = verifiedIdentity;
  };

  setLastActive = (lastActive) => {
    this.lastActive = lastActive;
  };

  setArchived = (archived) => {
    this.archived = archived;
  };

  setUsernameChange = (usernameChange) => {
    this.usernameChange = usernameChange;
  };

  setMenuSelected = (menuSelected) => {
    this.menuSelected = menuSelected;
  };

  setFollowers = (followers) => {
    this.followers = followers;
  };

  setFollowing = (following) => {
    this.following = following;
  };

  setVisitors = (visitors) => {
    this.visitors = visitors;
  };

  setPhotos = (photos) => {
    this.photos = photos;
  };

  setNotifications = (notifications) => {
    this.notifications = notifications;
  };

  setMessages = (messages) => {
    this.messages = messages;
  };

  setEvents = (events) => {
    this.events = events;
  };

  setComments = (comments) => {
    this.comments = comments;
  };

  fetchUserData = async (loader = true) => {
    try {
      if (loader) {
        this.setIsLoading(true);
      }
      const userData = await getUserInfo();
      if (userData) {
        console.log("userData", userData);
        this.set_id(parseInt(userData._id));
        this.setIsAdmin(userData.isAdmin);
        this.setEmail(userData.email);
        this.setUserName(userData.userName);
        this.setAvatar(userData.avatar);
        this.setFirstName(userData.firstName);
        this.setLastName(userData.lastName);
        this.setFriends(userData.friends);
        this.setDescription(userData.description);
        this.setFollowers(userData.followers);
        this.setFollowing(userData.following);
        this.setLastActive(userData.lastActive);
        this.setLanguage(userData.language);
        this.setGender(userData.gender);
        this.setOrientation(userData.orientation);
        this.setWishes(userData.wishes);
        this.setInterests(userData.interests);
        this.setUsernameChange(userData.usernameChange);
        this.setNotifications(userData.notifications);
        this.setArchived(userData.archived);
        if (userData.isAdmin) {
          this.setAdminRoles(userData.adminRoles);
        }
        if (userData.isPartner) {
          this.setPartnerRoles(userData.partnerRoles);
        }
        if (
          userData.profilSettings === null ||
          userData.emailSettings === null
        ) {
          this.setEmailSettings(defaultEmailSettings);
          this.setProfilSettings(defaultProfilSettings);
          updateSettings(defaultEmailSettings, defaultProfilSettings);
        } else {
          this.setEmailSettings(JSON.parse(userData.emailSettings));
          this.setProfilSettings(JSON.parse(userData.profilSettings));
        }
      }
      this.setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
}

export const userStore = new UserStore();
