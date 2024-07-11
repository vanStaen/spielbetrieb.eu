import { action, makeObservable, observable } from "mobx";

import { getProfileInfo } from "./getProfileInfo.js";
import { getProfileEvents } from "./getProfileEvents.js";
import { getProfilePartners } from "./getProfilePartners.js";

export class ProfileStore {
  isLoading = true;
  error = null;
  id = null;
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
  photos = [];
  reviews = [];
  tags = [];
  events = [];
  interests = [];
  wishes = [];
  links = [];
  description = null;
  partners = [];

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      error: observable,
      id: observable,
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
      filterIsPopingUp: observable,
      photos: observable,
      reviews: observable,
      tags: observable,
      events: observable,
      interests: observable,
      wishes: observable,
      description: observable,
      links: observable,
      partners: observable,
      setPartners: action,
      setIsLoading: action,
      setError: action,
      setid: action,
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
      setFilterIsPopingUp: action,
      fetchProfileData: action,
      fetchProfilePartners: action,
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

  setid = (id) => {
    this.id = id;
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

  setPartners = (partners) => {
    this.partners = partners;
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
          this.setid(parseInt(profileData.id));
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
          this.setLastActive(profileData.lastActive);
          this.setProfilSettings(JSON.parse(profileData.profilSettings));
          this.setPhotos(profileData.photos);
          this.setReviews(profileData.reviews);
          this.setTags(profileData.userTags);
          this.setInterests(profileData.interests);
          this.setWishes(profileData.wishes);
          this.setDescription(profileData.description);
          this.setLinks(profileData.links);
          let [events, partners] = await Promise.all([
            getProfileEvents(profileData.id),
            getProfilePartners(profileData.id),
          ]);
          events && this.setEvents(events);
          partners && this.setPartners(partners);
        }
        this.setError(null);
      }
    } catch (error) {
      this.setError(error);
      console.error(error);
    }
    this.setIsLoading(false);
  };

  fetchProfilePartners = async () => {
    const partners = await getProfilePartners(this.id);
    this.setPartners(partners);
  }
}

export const profileStore = new ProfileStore();
