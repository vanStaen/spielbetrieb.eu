import { action, makeObservable, observable } from "mobx";

import { getProfileInfo } from "./getProfileInfo.js";

export class ProfileStore {
  isLoading = true;
  error = null;
  _id = null;
  userName = null;
  avatar = null;
  birthday = null;
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
  partnertypeId = null;
  photos = [];
  reviews = [];
  tags = [];
  events = [];
  interests = [];
  wishes = [];
  links = [];
  description = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      _id: observable,
      userName: observable,
      avatar: observable,
      birthday: observable,
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
      partnertypeId: observable,
      filterIsPopingUp: observable,
      photos: observable,
      reviews: observable,
      tags: observable,
      events: observable,
      interests: observable,
      wishes: observable,
      description: observable,
      links: observable,
      setIsLoading: action,
      setError: action,
      set_id: action,
      setUserName: action,
      setAvatar: action,
      setBirthday: action,
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
      setPartnertypeId: action,
      setFilterIsPopingUp: action,
      fetchProfileData: action,
      setPhotos: action,
      setReviews: action,
      setTags: action,
      setEvents: action,
      setInterests: action,
      setWishes: action,
      setDescription: action,
      setLinks: action,
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

  setBirthday = (birthday) => {
    this.birthday = birthday;
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

  setPartnertypeId = (partnertypeId) => {
    this.partnertypeId = partnertypeId;
  };

  setFilterIsPopingUp = (filterIsPopingUp) => {
    this.filterIsPopingUp = filterIsPopingUp;
  };

  setPhotos = (photos) => {
    this.photos = photos;
  };

  setReviews = (reviews) => {
    this.reviews = reviews;
  };

  setTags = (tags) => {
    this.tags = tags;
  };

  setEvents = (events) => {
    this.events = events;
  };

  setInterests = (interests) => {
    this.interests = interests;
  };

  setWishes = (wishes) => {
    this.wishes = wishes;
  };

  setDescription = (description) => {
    this.description = description;
  };

  setLinks = (links) => {
    this.links = links;
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
          // console.log(profileData);
          this.set_id(parseInt(profileData._id));
          this.setAvatar(profileData.avatar);
          this.setBirthday(profileData.birthday);
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
          this.setPartnertypeId(profileData.partnertype);
          this.setLastActive(profileData.lastActive);
          this.setProfilSettings(JSON.parse(profileData.profilSettings));
          this.setPhotos(profileData.photos);
          this.setReviews(profileData.reviews);
          this.setTags(profileData.userTags);
          this.setEvents(profileData.events);
          this.setInterests(profileData.interests);
          this.setWishes(profileData.wishes);
          this.setDescription(profileData.description);
          this.setLinks(profileData.links);
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
