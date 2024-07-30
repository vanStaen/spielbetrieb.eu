import { action, makeObservable, observable } from "mobx";
import Cookies from "universal-cookie";

import { getGenders } from "./getGenders.js";
import { getOrientations } from "./getOrientations.js";
import { getTags } from "./getTags.js";
import { getPartnertypes } from "./getPartnertypes.js";

const cookies = new Cookies();

export class PageStore {
  selectedTheme = cookies.get("selectedTheme") || "dark";
  selectedLanguage = cookies.get("selectedLanguage");
  allowCookie = cookies.get("allowCookie");
  showMenu = false;
  showMenuMobile = false;
  events = [];
  isLoadingEvent = true;
  tags = [];
  genders = [];
  orientations = [];
  partnertypes = [];
  showOverlayGallery = false;
  picturesUrls = [];
  pictureSelected = 0;
  notifications = [];
  notificationsCount = 0;
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
      notificationsCount: observable,
      setNotificationsCount: action,
      unseenNotificationsCount: observable,
      setUnseenNotificationsCount: action,
      genders: observable,
      setGenders: action,
      orientations: observable,
      setOrientations: action,
      partnertypes: observable,
      setPartnertypes: action,
      tags: observable,
      setTags: action,
      fetchData: action,
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

  setNotificationsCount = (notificationsCount) => {
    this.notificationsCount = notificationsCount;
  };

  setUnseenNotificationsCount = (unseenNotificationsCount) => {
    if (unseenNotificationsCount > 0) {
      this.unseenNotificationsCount = unseenNotificationsCount;
    } else {
      this.unseenNotificationsCount = 0;
    }
  };

  fetchData = async () => {
    try {
      const dataGenders = await getGenders();
      const dataTags = await getTags();
      const dataOrientations = await getOrientations();
      const dataPartnertypes = await getPartnertypes();
      this.setGenders(dataGenders);
      this.setTags(dataTags);
      this.setOrientations(dataOrientations);
      this.setPartnertypes(dataPartnertypes);
    } catch (e) {
      console.error(e);
    }
  };

  setTags = (tags) => {
    this.tags = tags;
  };

  setGenders = (genders) => {
    this.genders = genders;
  };

  setOrientations = (orientations) => {
    this.orientations = orientations;
  };

  setPartnertypes = (partnertypes) => {
    this.partnertypes = partnertypes;
  };
}

export const pageStore = new PageStore();
