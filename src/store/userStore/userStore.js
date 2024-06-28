import { action, makeObservable, observable } from "mobx";

import { pageStore } from "../pageStore/pageStore.js";
import { getUserInfo } from "./getUserInfo.js";
import { updateSettings } from "./updateSettings.js";
import defaultEmailSettings from "./defaultEmailSettings.json";
import defaultProfilSettings from "./defaultProfilSettings.json";

export class UserStore {
  isLoading = true;
  isAdmin = false;
  adminRoles = [];
  email = null;
  firstName = null;
  lastName = null;
  userName = null;
  avatar = null;
  emailSettings = null;
  profilSettings = null;
  verifiedIdentity = null;
  genderId = null;
  orientationId = null;
  location = null;
  coordinates = null;
  lastActive = null;
  archived = null;
  usernameChange = null;
  language = null;
  birthday = null;
  friends = [];
  friendrequests = [];
  followers = [];
  following = [];
  messages = [];
  notifications = [];
  visitors = [];
  id = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
      isAdmin: observable,
      setIsAdmin: action,
      adminRoles: observable,
      setAdminRoles: action,
      email: observable,
      setEmail: action,
      firstName: observable,
      setFirstName: action,
      lastName: observable,
      setLastName: action,
      userName: observable,
      setUserName: action,
      avatar: observable,
      setAvatar: action,
      birthday: observable,
      setBirthday: action,
      emailSettings: observable,
      setEmailSettings: action,
      profilSettings: observable,
      setProfilSettings: action,
      verifiedIdentity: observable,
      setVerifiedIdentity: action,
      language: observable,
      setLanguage: action,
      genderId: observable,
      setGenderId: action,
      orientationId: observable,
      setOrientationId: action,
      location: observable,
      setLocation: action,
      coordinates: observable,
      setCoordinates: action,
      lastActive: observable,
      setLastActive: action,
      archived: observable,
      setArchived: action,
      usernameChange: observable,
      setUsernameChange: action,
      messages: observable,
      setMessages: action,
      notifications: observable,
      setNotifications: action,
      visitors: observable,
      setVisitors: action,
      friends: observable,
      setFriends: action,
      friendrequests: observable,
      setFriendrequests: action,
      followers: observable,
      setFollowers: action,
      following: observable,
      setFollowing: action,
      id: observable,
      setid: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setid = (id) => {
    this.id = id;
  };

  setIsAdmin = (isAdmin) => {
    this.isAdmin = isAdmin;
  };

  setAdminRoles = (adminRoles) => {
    this.adminRoles = adminRoles;
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

  setBirthday = (birthday) => {
    this.birthday = birthday;
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

  setGenderId = (genderId) => {
    this.genderId = genderId;
  };

  setOrientationId = (orientationId) => {
    this.orientationId = orientationId;
  };

  setLocation = (location) => {
    this.location = location;
  };

  setCoordinates = (coordinates) => {
    this.coordinates = coordinates;
  };

  setFriends = (friends) => {
    this.friends = friends;
  };

  setFriendrequests = (friendrequests) => {
    this.friendrequests = friendrequests;
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

  setNotifications = (notifications) => {
    this.notifications = notifications;
  };

  setMessages = (messages) => {
    this.messages = messages;
  };

  fetchUserData = async (loader = true) => {
    try {
      if (loader) {
        this.setIsLoading(true);
      }
      const userData = await getUserInfo();
      if (userData) {
        // console.log("userData", userData);
        this.setid(parseInt(userData.id));
        this.setIsAdmin(userData.isAdmin);
        this.setEmail(userData.email);
        this.setUserName(userData.userName);
        this.setAvatar(userData.avatar);
        this.setBirthday(userData.birthday);
        this.setFirstName(userData.firstName);
        this.setLastName(userData.lastName);
        this.setFriends(userData.friends);
        this.setFollowers(userData.followers);
        this.setFriendrequests(userData.friendrequests);
        this.setFollowing(userData.following);
        this.setLastActive(userData.lastActive);
        this.setLanguage(userData.language);
        this.setGenderId(userData.gender);
        this.setOrientationId(userData.orientation);
        this.setLocation(userData.location);
        this.setCoordinates(userData.coordinates);
        this.setUsernameChange(userData.usernameChange);
        this.setNotifications(userData.notifications);
        this.setArchived(userData.archived);
        if (userData.isAdmin) {
          this.setAdminRoles(userData.adminRoles);
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
        const notificationsCount = userData.notifications.length;
        pageStore.setNotificationsCount(notificationsCount);
        const unSeenNotificationsCount = userData.notifications.filter(
          (notif) => notif.seen === false,
        ).length;
        pageStore.setUnseenNotificationsCount(unSeenNotificationsCount);
      }
      this.setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
}

export const userStore = new UserStore();
