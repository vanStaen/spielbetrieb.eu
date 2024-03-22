import React from "react";
import { observer } from "mobx-react";

import { pageStore } from "../../../../store/pageStore/pageStore";
import { BrowseFilter } from "./BrowseFilter/BrowseFilter";
import { TagsFilter } from "./TagsFilter/TagsFilter";
import { EventtypesFilter } from "./EventtypesFilter/EventtypesFilter";
import { LocationsFilter } from "./LocationsFilter/LocationsFilter";

import "./EventFilters.less";
export const EventFilters = observer((props) => {
  return (
    <div
      className={`spielplan__filterContainer ${pageStore.selectedTheme === "light" ? "lightColorTheme__Text" : "darkColorTheme__Text"}`}
    >
      <div className="spielplan__fitler" ref={props.ref2}>
        <LocationsFilter />
        <EventtypesFilter />
        <TagsFilter />
      </div>
      <div className="spielplan__browseZeitRaum">
        <BrowseFilter ref1={props.ref1} />
      </div>
    </div>
  );
});
