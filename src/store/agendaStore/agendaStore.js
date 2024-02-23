import { action, makeObservable, observable } from "mobx";
import * as dayjs from "dayjs";

import { getAllPublicEvents } from "./getAllPublicEvents";
import { getEventtypes } from "./getEventtypes";
import { getTags } from "./getTags";
import { getLocations } from "./getLocations";
import { DATE_FORMAT_MONTH, DATE_FORMAT_CW, DATE_FORMAT_DAY } from "../../lib/data/dateFormat";

export class AgendaStore {
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
    });
  }

  setEvents = (events) => {
    this.events = events;
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
      newFilterDateFrom = dayjs(this.filterDateFrom).add(
        1,
        this.timeSpan,
      );
    } else {
      newFilterDateFrom = dayjs(this.filterDateFrom).subtract(
        1,
        this.timeSpan,
      );
    }
    this.setFilterDateFrom(newFilterDateFrom);
    this.fetchEvents();
  };
}

export const agendaStore = new AgendaStore();
