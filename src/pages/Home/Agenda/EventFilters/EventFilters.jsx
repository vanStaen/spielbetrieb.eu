import React from "react";
import { observer } from "mobx-react";

import { pageStore } from "../../../../store/pageStore/pageStore";
import { BrowseFilter } from "./BrowseFilter/BrowseFilter";
import { TagsFilter } from "./TagsFilter/TagsFilter";
import { EventtypesFilter } from "./EventtypesFilter/EventtypesFilter";
import { LocationsFilter } from "./LocationsFilter/LocationsFilter";

import "./EventFilters.less";
export const EventFilters = observer(() => {
  return (
    <div
      className={`agenda__filterContainer ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
    >
      <div className="agenda__fitler">
        {/*
          TODO:
          search per text
        */}
        <TagsFilter />
        <EventtypesFilter />
        <LocationsFilter />
      </div>
      <div className="agenda__browseZeitRaum">
        <BrowseFilter />
      </div>
    </div>
  );
});
