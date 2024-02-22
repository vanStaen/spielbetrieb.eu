import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { observer } from "mobx-react";
import { TagsOutlined } from "@ant-design/icons";

import { nameParser } from "../../../../../helpers/nameParser";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { agendaStore } from "../../../../../store/agendaStore/agendaStore";

import "./TagsFilter.less";

export const TagsFilter = observer(() => {
  const [selectedValues, setSelectedValues] = useState([]);
  const tagOptions = agendaStore.tags.map((tag) => {
    return {
      value: tag._id,
      label: nameParser(tag.name, pageStore.selectedLanguage),
    };
  });

  const selectChangehandler = (e) => {
    agendaStore.setFilterTags(e);
    setSelectedValues(e);
  };

  useEffect(() => {
    console.log("filterTags updated", agendaStore.filterTags);
    setSelectedValues(agendaStore.filterTags);
  }, [agendaStore.filterTags]);

  return (
    <Select
      showSearch
      mode="multiple"
      allowClear
      optionFilterProp="label"
      className="tagfilter__Select"
      style={{ minWidth: 120 }}
      onChange={selectChangehandler}
      value={selectedValues}
      placeholder={
        <>
          <TagsOutlined /> Tags
        </>
      }
      options={tagOptions}
    />
  );
});
