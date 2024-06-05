import { action, makeObservable, observable } from "mobx";

import { getProfileInfo } from "./getProfileInfo.js";

export class ProfileStore {
  isLoading = true;
  error = null;
  _id = null;
  userName = null;
  avatar = null;
  firstName = null;
  lastName = null;
  gender = null;
  orientation = null;
  friends = [];
  friendrequests = [];
  followers = [];
  following = [];
  lastActive = null;
  profilSettings = null;
  filterIsPopingUp = false;
  isPartner = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      _id: observable,
      userName: observable,
      avatar: observable,
      firstName: observable,
      lastName: observable,
      gender: observable,
      orientation: observable,
      friends: observable,
      friendrequests: observable,
      followers: observable,
      following: observable,
      lastActive: observable,
      profilSettings: observable,
      isPartner: observable,
      filterIsPopingUp: observable,
      setIsLoading: action,
      setError: action,
      set_id: action,
      setUserName: action,
      setAvatar: action,
      setFirstName: action,
      setLastName: action,
      setGender: action,
      setOrientation: action,
      setFriends: action,
      setFriendrequests: action,
      setFollowers: action,
      setFollowing: action,
      setLastActive: action,
      setProfilSettings: action,
      setIsPartner: action,
      setFilterIsPopingUp: action,
      fetchProfileData: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setError = (error) => {
    this.error = error;
  };

  set_id = (_id) => {
    this._id = _id;
  };

  setUserName = (userName) => {
    this.userName = userName;
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  setFirstName = (firstName) => {
    this.firstName = firstName;
  };

  setLastName = (lastName) => {
    this.lastName = lastName;
  };

  setGender = (gender) => {
    this.gender = gender;
  };

  setOrientation = (orientation) => {
    this.orientation = orientation;
  };

  setFriends = (friends) => {
    this.friends = friends;
  };

  setFriendrequests = (friendrequests) => {
    this.friendrequests = friendrequests;
  };

  setFollowers = (followers) => {
    this.followers = followers;
  };

  setFollowing = (following) => {
    this.following = following;
  };

  setLastActive = (lastActive) => {
    this.lastActive = lastActive;
  };

  setProfilSettings = (profilSettings) => {
    this.profilSettings = profilSettings;
  };

  setIsPartner = (isPartner) => {
    this.isPartner = isPartner;
  };

  setFilterIsPopingUp = (filterIsPopingUp) => {
    this.filterIsPopingUp = filterIsPopingUp;
  };

  fetchProfileData = async (userName, loader = true) => {
    try {
      if (loader) {
        this.setIsLoading(true);
      }
      if (userName) {
        this.setUserName(userName);
        const profileData = await getProfileInfo(userName);
        if (profileData) {
          this.set_id(parseInt(profileData._id));
          this.setAvatar(profileData.avatar);
          this.setFirstName(profileData.firstName);
          this.setLastName(profileData.lastName);
          this.setFriends(profileData.friends);
          this.setFriendrequests(profileData.friendrequests);
          this.setFollowers(profileData.followers);
          this.setFollowing(profileData.following);
          this.setGender(profileData.gender);
          this.setOrientation(profileData.orientation);
          this.setIsPartner(profileData.isPartner);
          this.setLastActive(profileData.lastActive);
          this.setProfilSettings(JSON.parse(profileData.profilSettings));
        }
        this.setError(null);
        this.setIsLoading(false);
      }
    } catch (error) {
      this.setError(error);
    }
  };
}

export const profileStore = new ProfileStore();
