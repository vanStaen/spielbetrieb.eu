import React from "react";
import { Select } from "antd";
import { observer } from "mobx-react";
import { TagsOutlined } from "@ant-design/icons";

import { nameParser } from "../../../../../helpers/nameParser";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";

import "./TagsFilter.less";

export const TagsFilter = observer(() => {
  const tagOptions = spielplanStore.tags.map((tag) => {
    return {
      value: tag._id,
      label: nameParser(tag.name, pageStore.selectedLanguage),
    };
  });

  const selectChangehandler = (e) => {
    spielplanStore.setFilterTags(e);
  };

  return (
    <Select
      showSearch
      mode="multiple"
      allowClear
      optionFilterProp="label"
      className="tagfilter__Select"
      style={{ minWidth: 120 }}
      onChange={selectChangehandler}
      value={spielplanStore.filterTags}
      placeholder={
        <>
          <TagsOutlined /> Tags
        </>
      }
      options={tagOptions}
    />
  );
});
