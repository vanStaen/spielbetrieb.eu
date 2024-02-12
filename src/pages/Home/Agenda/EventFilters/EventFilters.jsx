import React from "react";
import * as dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { 
    CaretLeftOutlined, 
    CaretRightOutlined,
} from '@ant-design/icons';

import { pageStore } from "../../../../store/pageStore/pageStore";

import "./EventFilters.less";

export const EventFilters = observer(() => {
    return (
        <div className={`agenda__filterContainer ${pageStore.selectedTheme === "light" ? 'lightColorTheme__Text' : 'darkColorTheme__Text'}`}>
            <div className='agenda__browseMonth'>                
                <CaretLeftOutlined className='agenda__browseMonthLogo'/>{" "}
                {dayjs().format('MMMM, YYYY')}{" "}
                <CaretRightOutlined className='agenda__browseMonthLogo'/>
            </div>
            <div className='agenda__fitler'>                
                here will come more filters
            </div>
        </div>
    )
})