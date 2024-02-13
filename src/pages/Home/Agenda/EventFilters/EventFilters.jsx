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

import "./EventFilters.less";

export const EventFilters = observer(() => {
    const [filterFormat, setFilterFormat] = useState('month'); // Day, Week, Month
    const [filterZeitRaumDate, setFilterZeitRaumDate] = useState(dayjs())
    const [filterZeitRaumText, setFilterZeitRaumText] = useState(dayjs().format('MMM, YYYY'))

    const filterFormatChange = () => {

    }

    const handleChangeZeitRaumClick = (add) => {
        let newFilterZeitRaumDate;
        let dateFormat;
        if (add) {
            newFilterZeitRaumDate = dayjs(filterZeitRaumDate).add(1, filterFormat);
        } else {
            newFilterZeitRaumDate = dayjs(filterZeitRaumDate).subtract(1, filterFormat);
        }            
        setFilterZeitRaumDate(newFilterZeitRaumDate);
        if (filterFormat === 'month') { dateFormat = 'MMM, YYYY' }
        else if (filterFormat === 'week') { dateFormat = 'ww, YYYY' }
        else if (filterFormat === 'day') { dateFormat = 'DD MMM, YYYY' }
        setFilterZeitRaumText(newFilterZeitRaumDate.format(dateFormat));

    }

    return (
        <div className={`agenda__filterContainer ${pageStore.selectedTheme === "light" ? 'lightColorTheme__Text' : 'darkColorTheme__Text'}`}>
            <div className='agenda__fitlerSearch'>                
                here come filters & search
            </div>
            <div className='agenda__browseZeitRaum'>
                <CaretLeftOutlined 
                    className='agenda__browseZeitRaumLogo'
                    onClick={() => handleChangeZeitRaumClick(false)}
                />{" "}
                { filterZeitRaumText }{" "}
                <CaretRightOutlined 
                    className='agenda__browseZeitRaumLogo'
                    onClick={() => handleChangeZeitRaumClick(true)}
                />
            </div>
        </div>
    )
})