import { action, makeObservable, observable } from "mobx";

import { getProfileInfo } from "./getProfileInfo.js";
import { postFremdPending } from "./postFremdPending.js";

export class ProfileStore {
  isLoading = true;
  error = null;
  _id = null;
  userName = null;
  avatar = null;
  firstName = null;
  lastName = null;
  gender = null;
  friends = [];
  friendsPending = [];
  followers = [];
  followed = [];
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
      friends: observable,
      friendsPending: observable,
      followers: observable,
      followed: observable,
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
      setFriends: action,
      setFriendsPending: action,
      setFollowers: action,
      setFollowed: action,
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

  setFriends = (friends) => {
    this.friends = friends;
  };

  setFriendsPending = (friendsPending) => {
    this.friendsPending = friendsPending;
  };

  setFollowers = (followers) => {
    this.followers = followers;
  };

  setFollowed = (followed) => {
    this.followed = followed;
    console.log(followed)
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
    // console.log(">>> Fetching profile data");
    try {
      if (loader) {
        this.setIsLoading(true);
      }
      if (userName) {
        this.setUserName(userName);
        const profileData = await getProfileInfo(userName);
        const pendingData = await postFremdPending(parseInt(profileData._id));
        if (profileData && pendingData) {
          const friendsNotPending = profileData.friends.filter((friend) => {
            const isPending = pendingData.findIndex(
              (pending) => pending.friend_id === parseInt(friend._id),
            );
            if (isPending === -1) {
              return true;
            }
            return false;
          });
          this.set_id(parseInt(profileData._id));
          this.setAvatar(profileData.avatar);
          this.setFirstName(profileData.firstName);
          this.setLastName(profileData.lastName);
          this.setFriends(friendsNotPending);
          this.setFriendsPending(pendingData);
          this.setFollowers(profileData.followers);
          this.setFollowed(profileData.followed);
          this.setGender(profileData.gender);
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
