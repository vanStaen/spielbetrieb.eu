import { action, makeObservable, observable } from 'mobx';
import Cookies from 'universal-cookie';

import { getAllPublicEvents } from './getAllPublicEvents';
import { getEventtypes } from './getEventtypes';
import { getTags } from './getTags';
import { getLocations } from './getLocations';

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
      setShowMenuMobile: action,
      fetchEvents: action,
      setEvents: action,
      events: observable,
      setIsLoadingEvent: action,
      isLoadingEvent: observable,
      fetchEventtypes: action,
      setEventtypes: action,
      eventtypes: observable,
      fetchTags: action,
      setTags: action,
      tags: observable,
      fetchLocations: action,
      setLocations: action,
      locations: observable,
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

  setEvents = (events) => {
    this.events = events;
  };

  setIsLoadingEvent = (isLoadingEvent) => {
    this.isLoadingEvent = isLoadingEvent;
  };

  fetchEvents = async () => {
    const events = await getAllPublicEvents(0, 100000000);  
    this.setEvents(events);
    this.setIsLoadingEvent(false);
  };

  setEventtypes = (eventtypes) => {
    this.eventtypes = eventtypes;
  };

  fetchEventtypes = async () => {
    const eventtypes = await getEventtypes();
    this.setEventtypes(eventtypes);
  };

  setTags = (tags) => {
    this.tags = tags;
  };

  fetchTags = async () => {
    const tags = await getTags();
    this.setTags(tags);
  };

  setLocations = (locations) => {
    this.locations = locations;
  };

  fetchLocations = async () => {
    const locations = await getLocations();
    this.setLocations(locations);
  };

}

export const pageStore = new PageStore();
