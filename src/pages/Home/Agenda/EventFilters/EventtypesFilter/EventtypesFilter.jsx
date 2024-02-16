import React from "react";
import { Select } from "antd";
import { observer } from "mobx-react";

import { nameParser } from "../../../../../helpers/nameParser";
import { pageStore } from "../../../../../store/pageStore/pageStore";

import "./EventtypesFilter.less";

export const EventtypesFilter = observer(() => {
  const eventTypesOptions = pageStore.eventtypes.map((eventtype) => {
    return {
      value: eventtype._id,
      label: nameParser(eventtype.name, pageStore.selectedLanguage),
    };
  });

  return (
    <Select
      showSearch
      className="eventtypefilter__Select"
      style={{ width: 200 }}
      placeholder="event types"
      options={eventTypesOptions}
    />
  );
});
