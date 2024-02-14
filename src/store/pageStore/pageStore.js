import { action, makeObservable, observable } from 'mobx';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class PageStore {
  selectedTheme = cookies.get('selectedTheme') || 'dark';
  selectedLanguage = cookies.get('selectedLanguage');
  allowCookie = cookies.get('allowCookie');
  showMenu = false;
  showMenuMobile = false;
  events = [];
  isLoadingEvent = true; 
  eventtypes = [];
  tags = [];
  locations = [];

  constructor () {
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
    });
  }

  setSelectedTheme = (selectedTheme) => {
    this.selectedTheme = selectedTheme;
    if (this.allowCookie) {
      cookies.set('selectedTheme', selectedTheme, { path: '/' });
    }
  };

  setSelectedLanguage = (selectedLanguage) => {
    this.selectedLanguage = selectedLanguage;
    if (this.allowCookie) {
      cookies.set('selectedLanguage', selectedLanguage, { path: '/' });
    }
  };

  setAllowCookie = (allowCookie) => {
    this.allowCookie = allowCookie;
    if (allowCookie) {
      cookies.set('allowCookie', true, { path: '/' });
    }
  };

  setShowMenu = (showMenu) => {
    this.showMenu = showMenu;
  };

  setShowMenuMobile = (showMenuMobile) => {
    this.showMenuMobile = showMenuMobile;
  };

}

export const pageStore = new PageStore();
