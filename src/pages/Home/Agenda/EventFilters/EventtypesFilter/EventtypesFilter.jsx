import React from "react";
import { Select } from "antd";
import { observer } from "mobx-react";
import { CalendarOutlined } from "@ant-design/icons";

import { nameParser } from "../../../../../helpers/nameParser";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { agendaStore } from "../../../../../store/agendaStore/agendaStore";

import "./EventtypesFilter.less";

export const EventtypesFilter = observer(() => {
  const eventTypesOptions = agendaStore.eventtypes.map((eventtype) => {
    return {
      value: eventtype._id,
      label: nameParser(eventtype.name, pageStore.selectedLanguage),
    };
  });

  return (
    <Select
      showSearch
      mode="multiple"
      allowClear
      optionFilterProp="label"
      className="eventtypefilter__Select"
      style={{ minWidth: 120 }}
      placeholder={
        <>
          <CalendarOutlined /> Event
        </>
      }
      options={eventTypesOptions}
    />
  );
});
