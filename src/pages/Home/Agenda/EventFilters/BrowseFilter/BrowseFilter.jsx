import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react';
import { 
    CaretLeftOutlined, 
    CaretRightOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as isoWeek from 'dayjs/plugin/isoWeek';

import { pageStore } from "../../../../../store/pageStore/pageStore";

import './BrowseFilter.less';

const DATE_FORMAT_MONTH = 'MMM, YYYY';
const DATE_FORMAT_CW = 'ww, YYYY';
const DATE_FORMAT_DAY = 'DD MMM, YYYY';

export const BrowseFilter = observer(() => {
    const [showFormatMenu, setShowFormatMenu] = useState(false);
    const [filterFormat, setFilterFormat] = useState('month'); // Day, Week, Month
    const [filterDateFrom, setFilterDateFrom] = useState(dayjs())
    const [filterText, setFilterText] = useState(dayjs().format(DATE_FORMAT_MONTH))

    const handleChangeZeitRaumClick = (add) => {
        let newFilterDateFrom;
        if (add) {
            newFilterDateFrom = dayjs(filterDateFrom).add(1, filterFormat);
        } else {
            newFilterDateFrom = dayjs(filterDateFrom).subtract(1, filterFormat);
        }            
        setFilterDateFrom(newFilterDateFrom);
        updateFilterFormatDisplay(filterFormat, newFilterDateFrom);
    }

    const filterFormatChange = (newFormat) => {
        console.log('newFormat', newFormat);
        setFilterFormat(newFormat);
        updateFilterFormatDisplay(newFormat, filterDateFrom);
        handleHideMenu();
    }

    const updateFilterFormatDisplay = (newfilterFormat, newFilterDateFrom) => {
        let browseFilterText;
        if (newfilterFormat === 'month') { 
            browseFilterText = newFilterDateFrom.format(DATE_FORMAT_MONTH)
        }
        else if (newfilterFormat === 'week') { 
            browseFilterText = <><span style={{opacity: .5}}>Week </span>{newFilterDateFrom.format(DATE_FORMAT_CW)}</>
        }
        else if (newfilterFormat === 'day') {
            browseFilterText = newFilterDateFrom.format(DATE_FORMAT_DAY)
        } 
        setFilterText(browseFilterText);
    }

    const handleHideMenu = () => {
        const elementContainer = document.getElementById('browseFilter__menuContainer');
        elementContainer.style.opacity = 0;
        setTimeout(function () {
            setShowFormatMenu(false);
        }, 300);
    };

    const resetHandler = () => {
        setFilterDateFrom(dayjs());
        setFilterFormat('day');
        updateFilterFormatDisplay('day', dayjs());
        handleHideMenu(true);
    }

    return (
            <div className='browseFilter__container'>
                <div className="browseFilter__text">
                    <CaretLeftOutlined 
                        className='browseFilter__logo'
                        onClick={() => handleChangeZeitRaumClick(false)}
                    />{" "}
                    <span onClick={() => setShowFormatMenu(!showFormatMenu)}>{ filterText }</span>{" "}
                    <CaretRightOutlined 
                        className='browseFilter__logo'
                        onClick={() => handleChangeZeitRaumClick(true)}
                    />
                </div>
                {showFormatMenu && 
                    <>
                        <div
                            className="browseFilter__silentBackground"
                            onClick={handleHideMenu}
                        >
                        </div>
                        <div
                            className={`browseFilter__menuContainer ${pageStore.selectedTheme === 'light' ? 'lightColorTheme__Menu' : 'darkColorTheme__Menu'}`}
                            id="browseFilter__menuContainer"
                        >
                            <div 
                                className={`browseFilter__menuElement menu__element ${filterFormat === 'month' && 'menu__elementSelected'}`}
                                onClick={() => filterFormatChange("month")}
                            >
                                {dayjs(filterDateFrom).format(DATE_FORMAT_MONTH)}
                            </div>
                            <div 
                                className={`browseFilter__menuElement menu__element ${filterFormat === 'week' && 'menu__elementSelected'}`}
                                onClick={() => filterFormatChange("week")}
                            >
                                Week {dayjs(filterDateFrom).format(DATE_FORMAT_CW)}
                            </div>
                            <div 
                                className={`browseFilter__menuElement menu__element ${filterFormat === 'day' && 'menu__elementSelected'}`}
                                onClick={() => filterFormatChange("day")}
                            >
                                {dayjs(filterDateFrom).format(DATE_FORMAT_DAY)}
                            </div>
                            <div className="menu__whiteline"></div>
                            <div 
                                className="browseFilter__menuElement menu__element"
                                onClick={resetHandler}
                            >
                                <CalendarOutlined /> today
                            </div>
                        </div>
                    </>
                }
            </div>
        )
})