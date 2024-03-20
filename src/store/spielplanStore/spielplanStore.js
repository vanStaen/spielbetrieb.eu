import { action, makeObservable, observable } from "mobx";
import dayjs from "dayjs";

import { getAllPublicEvents } from "./getAllPublicEvents.js";
import { getEventtypes } from "./getEventtypes.js";
import { getTags } from "./getTags.js";
import { getLocations } from "./getLocations.js";

export class SpielplanStore {
  isLoadingEvent = true;
  isLoadingData = true;
  events = [];
  eventtypes = [];
  tags = [];
  locations = [];
  timeSpan = "month";
  filterDateFrom = dayjs();
  filterLocations = [];
  filterEventtypes = [];
  filterTags = [];
  selectedEvent = null;

  constructor() {
    makeObservable(this, {
      events: observable,
      isLoadingEvent: observable,
      tags: observable,
      isLoadingData: observable,
      eventtypes: observable,
      locations: observable,
      filterDateFrom: observable,
      timeSpan: observable,
      filterLocations: observable,
      filterEventtypes: observable,
      fetchEvents: action,
      setEvents: action,
      setIsLoadingEvent: action,
      setIsLoadingData: action,
      fetchEventtypes: action,
      setEventtypes: action,
      fetchTags: action,
      setTags: action,
      fetchLocations: action,
      setLocations: action,
      setFilterDateFrom: action,
      setTimeSpan: action,
      setFilterLocations: action,
      setFilterEventtypes: action,
      setFilterTags: action,
      filterTags: observable,
      calculateFilterDateFrom: action,
      selectedEvent: observable,
      setSelectedEvent: action,
    });
  }

  setEvents = (events) => {
    this.events = events;
  };

  setSelectedEvent = (selectedEvent) => {
    this.selectedEvent = selectedEvent;
  };

  setIsLoadingEvent = (isLoadingEvent) => {
    this.isLoadingEvent = isLoadingEvent;
  };

  setIsLoadingData = (isLoadingData) => {
    this.isLoadingData = isLoadingData;
  };

  fetchEvents = async () => {
    this.setIsLoadingEvent(true);
    const fromUnixDateStartOf = this.filterDateFrom
      .startOf(this.timeSpan)
      .valueOf();
    const untilUnixDateEndOf = this.filterDateFrom
      .endOf(this.timeSpan)
      .valueOf();
    const events = await getAllPublicEvents(
      fromUnixDateStartOf,
      untilUnixDateEndOf,
    );
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

  setFilterDateFrom = (filterDateFrom) => {
    this.filterDateFrom = dayjs(filterDateFrom);
  };

  setTimeSpan = (timeSpan) => {
    this.timeSpan = timeSpan;
  };

  setFilterLocations = (filterLocations) => {
    this.filterLocations = filterLocations;
  };

  setFilterEventtypes = (filterEventtypes) => {
    this.filterEventtypes = filterEventtypes;
  };

  setFilterTags = (filterTags) => {
    this.filterTags = filterTags;
  };

  calculateFilterDateFrom = (add) => {
    let newFilterDateFrom;
    if (add) {
      newFilterDateFrom = dayjs(this.filterDateFrom).add(1, this.timeSpan);
    } else {
      newFilterDateFrom = dayjs(this.filterDateFrom).subtract(1, this.timeSpan);
    }
    this.setFilterDateFrom(newFilterDateFrom);
    this.fetchEvents();
  };
}

export const spielplanStore = new SpielplanStore();
