import React from "react";
import { Select } from "antd";
import { observer } from "mobx-react";

import { pageStore } from "../../../../../store/pageStore/pageStore";

import "./LocationsFilter.less";

export const LocationsFilter = observer(() => {
  const locationOptions = pageStore.locations.map((location) => {
    return { value: location._id, label: location.name };
  });

  return (
    <Select
      showSearch
      className="locationsfilter__Select"
      style={{ width: 200 }}
      placeholder="locations"
      options={locationOptions}
    />
  );
});
