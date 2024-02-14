import React from "react";
import { Select } from "antd";
import { observer } from 'mobx-react';

import { nameParser } from "../../../../../helpers/nameParser";
import { pageStore } from "../../../../../store/pageStore/pageStore";

import "./TagsFilter.less";

export const TagsFilter = observer(() => {

    const tagOptions = pageStore.tags.map(tag => {
        return { value: tag._id, label: nameParser(tag.name, pageStore.selectedLanguage) }
    })

    return (
            <Select
                showSearch
                className="tagfilter__Select"
                style={{ width: 200 }}
                placeholder="tags"
                options={tagOptions}
            />
    )
})