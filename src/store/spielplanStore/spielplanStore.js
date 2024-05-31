import { action, makeObservable, observable } from "mobx";
import dayjs from "dayjs";
import Cookies from "universal-cookie";

import { getAllPublicEvents } from "./getAllPublicEvents.js";
import { getAllEventtypes } from "./getAllEventtypes.js";
import { getTags } from "./getTags.js";
import { getLocations } from "./getLocations.js";
import { getArtists } from "./getArtists.js";
import { getEquipments } from "./getEquipments.js";
import { getDresscodes } from "./getDresscodes.js";
import { pageStore } from "../pageStore/pageStore.js";

const cookies = new Cookies();

export class SpielplanStore {
  isLoadingEvent = true;
  isLoadingData = true;
  events = [];
  eventtypes = [];
  tags = [];
  locations = [];
  dresscodes = [];
  equipments = [];
  artists = [];
  timeSpan = cookies.get("timeSpan") || "week";
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
      selectedEvent: observable,
      artists: observable,
      equipments: observable,
      dresscodes: observable,
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
      setSelectedEvent: action,
      setArtists: action,
      setEquipments: action,
      setDresscodes: action,
    });
  }

  setEvents = (events) => {
    this.events = events;
  };

  fetchEvents = async () => {
    this.setIsLoadingEvent(true);
    let fromUnixDateStartOf;
    let untilUnixDateEndOf;
    if (this.timeSpan === "all") {
      fromUnixDateStartOf = this.filterDateFrom.startOf("day").valueOf();
      untilUnixDateEndOf = this.filterDateFrom.endOf("year").valueOf();
    } else if (this.timeSpan === "week") {
      fromUnixDateStartOf = this.filterDateFrom
        .startOf("week")
        .add(1, "day")
        .valueOf();
      untilUnixDateEndOf = this.filterDateFrom
        .endOf("week")
        .add(1, "day")
        .valueOf();
    } else {
      fromUnixDateStartOf = this.filterDateFrom
        .startOf(this.timeSpan)
        .valueOf();
      untilUnixDateEndOf = this.filterDateFrom.endOf(this.timeSpan).valueOf();
    }
    console.log("getAllPublicEvents from", fromUnixDateStartOf);
    console.log("getAllPublicEvents until", untilUnixDateEndOf);
    const events = await getAllPublicEvents(
      fromUnixDateStartOf,
      untilUnixDateEndOf,
    );
    this.setEvents(events);
    this.setIsLoadingEvent(false);
  };

  fetchAllBaseData = async () => {
    if (!this.eventtypes) {
      await this.fetchEventtypes();
    }
    if (!this.tags) {
      await this.fetchTags();
    }
    if (!this.locations) {
      await this.fetchLocations();
    }
    await this.fetchDresscodes();
    if (!this.equipments) {
      await this.fetchEquipments();
    }
    if (!this.artists) {
      await this.fetchArtists();
    }
  };

  setArtists = (artists) => {
    this.artists = artists;
  };

  fetchArtists = async () => {
    const artists = await getArtists();
    this.setArtists(artists);
  };

  setEquipments = (equipments) => {
    this.equipments = equipments;
  };

  fetchEquipments = async () => {
    const equipments = await getEquipments();
    this.setEquipments(equipments);
  };

  setDresscodes = (dresscodes) => {
    this.dresscodes = dresscodes;
    console.log();
  };

  fetchDresscodes = async () => {
    const dresscodes = await getDresscodes();
    this.setDresscodes(dresscodes);
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

  setEventtypes = (eventtypes) => {
    this.eventtypes = eventtypes;
  };

  fetchEventtypes = async () => {
    const eventtypes = await getAllEventtypes();
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
    const todayUnixDate = dayjs().valueOf();
    const previousEndOfDateFrom = dayjs(filterDateFrom)
      .endOf(this.timeSpan)
      .valueOf();
    if (todayUnixDate > previousEndOfDateFrom) {
      // TODO: Inform user that we don't show past event?
    } else {
      this.filterDateFrom = dayjs(filterDateFrom);
    }
  };

  setTimeSpan = (timeSpan) => {
    this.timeSpan = timeSpan;
    if (pageStore.allowCookie) {
      cookies.set("timeSpan", timeSpan, { path: "/" });
    }
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
