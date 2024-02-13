import React, { useState } from "react";
import { observer } from 'mobx-react';
import { 
    CaretLeftOutlined, 
    CaretRightOutlined,
} from '@ant-design/icons';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as isoWeek from 'dayjs/plugin/isoWeek';

import { pageStore } from "../../../../store/pageStore/pageStore";
import { BrowseFilter } from "./BrowseFilter/BrowseFilter";

import "./EventFilters.less";

export const EventFilters = observer(() => {

    return (
        <div className={`agenda__filterContainer ${pageStore.selectedTheme === "light" ? 'lightColorTheme__Text' : 'darkColorTheme__Text'}`}>
            <div className='agenda__fitlerSearch'>                
                here come filters & search
            </div>
            <div className='agenda__browseZeitRaum'>
                <BrowseFilter />
            </div>
        </div>
    )
})