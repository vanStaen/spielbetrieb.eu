import React from "react";
import { Select } from "antd";
import { observer } from "mobx-react";
import { TagsOutlined } from "@ant-design/icons";

import { nameParser } from "../../../../../helpers/dev/nameParser";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";

import "./TagsFilter.less";

export const TagsFilter = observer(() => {

  const tagOptions = () => {
    const tagOptionsRow = spielplanStore.tags.map((tag) => {
      if (!tag.isEventTag) {
        return null;
      }
      return {
        value: tag.id,
        label: nameParser(tag.name, pageStore.selectedLanguage),
      };
    });

    return tagOptionsRow.filter(x => x != null);
  }

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
      options={tagOptions()}
    />
  );
});
