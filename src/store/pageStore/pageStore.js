import { action, makeObservable, observable } from "mobx";
import Cookies from "universal-cookie";
import { getNotifications } from "./getNotifications.js";

const cookies = new Cookies();

export class PageStore {
  selectedTheme = cookies.get("selectedTheme") || "dark";
  selectedLanguage = cookies.get("selectedLanguage");
  allowCookie = cookies.get("allowCookie");
  showMenu = false;
  showMenuMobile = false;
  events = [];
  isLoadingEvent = true;
  eventtypes = [];
  tags = [];
  locations = [];
  showOverlayGallery = false;
  picturesUrls = [];
  pictureSelected = 0;
  notifications = [];
  unseenNotificationsCount = 0;

  constructor() {
    makeObservable(this, {
      selectedTheme: observable,
      setSelectedTheme: action,
      selectedLanguage: observable,
      setSelectedLanguage: action,
      allowCookie: observable,
      setAllowCookie: action,
      showMenu: observable,
      setShowMenu: action,
      showMenuMobile: observable,
      setShowMenuMobile: action,
      showOverlayGallery: observable,
      setShowOverlayGallery: action,
      picturesUrls: observable,
      setPicturesUrls: action,
      pictureSelected: observable,
      setPictureSelected: action,
      notifications: observable,
      setNotifications: action,
      unseenNotificationsCount: observable,
      setUnseenNotificationsCount: action,
    });
  }

  setSelectedTheme = (selectedTheme) => {
    this.selectedTheme = selectedTheme;
    if (this.allowCookie) {
      cookies.set("selectedTheme", selectedTheme, { path: "/" });
    }
  };

  setSelectedLanguage = (selectedLanguage) => {
    this.selectedLanguage = selectedLanguage;
    if (this.allowCookie) {
      cookies.set("selectedLanguage", selectedLanguage, { path: "/" });
    }
  };

  setAllowCookie = (allowCookie) => {
    this.allowCookie = allowCookie;
    if (allowCookie) {
      cookies.set("allowCookie", true, { path: "/" });
    }
  };

  setShowMenu = (showMenu) => {
    this.showMenu = showMenu;
  };

  setShowMenuMobile = (showMenuMobile) => {
    this.showMenuMobile = showMenuMobile;
  };

  setShowOverlayGallery = (showOverlayGallery) => {
    this.showOverlayGallery = showOverlayGallery;
  };

  setPicturesUrls = (picturesUrls) => {
    this.picturesUrls = picturesUrls;
  };

  setPictureSelected = (pictureSelected) => {
    this.pictureSelected = pictureSelected;
  };

  setNotifications = (notifications) => {
    this.notifications = notifications;
  };

  setUnseenNotificationsCount = (unseenNotificationsCount) => {
    this.unseenNotificationsCount = unseenNotificationsCount;
  };

  fetchNotifications = async () => {
    try {
      const result = await getNotifications();
      this.setNotifications(result);
      const unSeenCount = result.filter((notif) => notif.seen === false).length;
      this.setUnseenNotificationsCount(unSeenCount);
    } catch (e) {
      console.log("error loading notification: ", e);
    }
  };
}

export const pageStore = new PageStore();
