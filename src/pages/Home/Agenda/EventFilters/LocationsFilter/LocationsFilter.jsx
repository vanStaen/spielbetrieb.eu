import React from "react";
import { Select } from "antd";
import { observer } from "mobx-react";
import { BankOutlined } from "@ant-design/icons";

import { agendaStore } from "../../../../../store/agendaStore/agendaStore";

import "./LocationsFilter.less";

export const LocationsFilter = observer(() => {
  const locationOptions = agendaStore.locations.map((location) => {
    return { value: location._id, label: location.name };
  });

  const locationOptionsInclCity = [
    {
      label: "Berlin",
      options: locationOptions,
    },
  ];

  return (
    <Select
      showSearch
      mode="multiple"
      allowClear
      optionFilterProp="label"
      className="locationsfilter__Select"
      style={{ minWidth: 120 }}
      options={locationOptionsInclCity}
      defaultOpen={true}
      placeholder={
        <>
          <BankOutlined /> Location
        </>
      }
    />
  );
});
