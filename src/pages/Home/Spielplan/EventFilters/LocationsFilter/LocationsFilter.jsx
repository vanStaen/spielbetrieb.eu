import React from "react";
import { Select } from "antd";
import { observer } from "mobx-react";
import { BankOutlined } from "@ant-design/icons";

import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";

import "./LocationsFilter.less";

export const LocationsFilter = observer(() => {
  const locationOptions = spielplanStore.locations.map((location) => {
    return { value: location._id, label: location.name };
  });

  const locationOptionsInclCity = [
    {
      label: "Berlin",
      options: locationOptions,
    },
  ];

  const selectChangehandler = (e) => {
    spielplanStore.setFilterLocations(e);
  };

  return (
    <Select
      showSearch
      mode="multiple"
      allowClear
      optionFilterProp="label"
      className="locationsfilter__Select"
      style={{ minWidth: 120 }}
      options={locationOptionsInclCity}
      onChange={selectChangehandler}
      placeholder={
        <>
          <BankOutlined /> Location
        </>
      }
    />
  );
});
