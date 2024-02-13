import React from "react";
import { Select } from "antd";
import { observer } from 'mobx-react';

import { pageStore } from "../../../../store/pageStore/pageStore";
import { BrowseFilter } from "./BrowseFilter/BrowseFilter";
import { TagsFilter } from "./TagsFilter/TagsFilter";

import "./EventFilters.less";
export const EventFilters = observer(() => {

    return (
        <div className={`agenda__filterContainer ${pageStore.selectedTheme === "light" ? 'lightColorTheme__Text' : 'darkColorTheme__Text'}`}>
            <div className='agenda__fitlerSearch'> 
                <TagsFilter />
            </div>
            <div className='agenda__browseZeitRaum'>
                <BrowseFilter />
            </div>
        </div>
    )
})