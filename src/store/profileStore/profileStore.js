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
  genderId = null;
  orientationId = null;
  location = null;
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
      genderId: observable,
      orientationId: observable,
      location: observable,
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
      setGenderId: action,
      setOrientationId: action,
      setLocation: action,
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

  setGenderId = (genderId) => {
    this.genderId = genderId;
  };

  setOrientationId = (orientationId) => {
    this.orientationId = orientationId;
  };

  setLocation = (location) => {
    this.location = location;
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
          console.log(profileData);
          this.set_id(parseInt(profileData._id));
          this.setAvatar(profileData.avatar);
          this.setFirstName(profileData.firstName);
          this.setLastName(profileData.lastName);
          this.setFriends(profileData.friends);
          this.setFriendrequests(profileData.friendrequests);
          this.setFollowers(profileData.followers);
          this.setFollowing(profileData.following);
          this.setGenderId(profileData.gender);
          this.setOrientationId(profileData.orientation);
          this.setLocation(profileData.location);
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
