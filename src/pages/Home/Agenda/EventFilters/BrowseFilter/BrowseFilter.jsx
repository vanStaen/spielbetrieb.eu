import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
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
import { agendaStore } from "../../../../../store/agendaStore/agendaStore";

import './BrowseFilter.less';

const DATE_FORMAT_MONTH = 'MMM, YYYY';
const DATE_FORMAT_CW = 'ww, YYYY';
const DATE_FORMAT_DAY = 'DD MMM, YYYY';

export const BrowseFilter = observer(() => {
    const { t } = useTranslation();
    const [showFormatMenu, setShowFormatMenu] = useState(false);
    const [filterText, setFilterText] = useState(dayjs().format(DATE_FORMAT_MONTH))

    const handleChangeZeitRaumClick = (add) => {
        let newFilterDateFrom;
        if (add) {
            newFilterDateFrom = dayjs(agendaStore.filterDateFrom).add(1, agendaStore.filterFormat);
        } else {
            newFilterDateFrom = dayjs(agendaStore.filterDateFrom).subtract(1, agendaStore.filterFormat);
        }            
        agendaStore.setFilterDateFrom(newFilterDateFrom);
        agendaStore.fetchEvents();
        updateFilterFormatDisplay(agendaStore.filterFormat, newFilterDateFrom);
    }

    const filterFormatChange = (newFormat) => {
        agendaStore.setFilterFormat(newFormat);
        agendaStore.fetchEvents();
        updateFilterFormatDisplay(newFormat, agendaStore.filterDateFrom);
        handleHideMenu();
    }

    const updateFilterFormatDisplay = (newfilterFormat, newFilterDateFrom) => {
        let browseFilterText;
        if (newfilterFormat === 'month') { 
            browseFilterText = newFilterDateFrom.format(DATE_FORMAT_MONTH)
        }
        else if (newfilterFormat === 'week') { 
            browseFilterText = <><span style={{opacity: .5}}>{t("agenda.week")} </span>{newFilterDateFrom.format(DATE_FORMAT_CW)}</>
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
        agendaStore.setFilterDateFrom(dayjs());
        agendaStore.setFilterFormat('day');
        agendaStore.fetchEvents();
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
                        className='browseFilter__logo browseFilter__logoRight'
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
                                className={`browseFilter__menuElement menu__element ${agendaStore.filterFormat === 'month' && 'menu__elementSelected'}`}
                                onClick={() => filterFormatChange("month")}
                            >
                                {dayjs(agendaStore.filterDateFrom).format(DATE_FORMAT_MONTH)}
                            </div>
                            <div 
                                className={`browseFilter__menuElement menu__element ${agendaStore.filterFormat === 'week' && 'menu__elementSelected'}`}
                                onClick={() => filterFormatChange("week")}
                            >
                                {t("agenda.week")} {dayjs(agendaStore.filterDateFrom).format(DATE_FORMAT_CW)}
                            </div>
                            <div 
                                className={`browseFilter__menuElement menu__element ${agendaStore.filterFormat === 'day' && 'menu__elementSelected'}`}
                                onClick={() => filterFormatChange("day")}
                            >
                                {dayjs(agendaStore.filterDateFrom).format(DATE_FORMAT_DAY)}
                            </div>
                            <div className="menu__whiteline"></div>
                            <div 
                                className="browseFilter__menuElement menu__element"
                                onClick={resetHandler}
                            >
                                <CalendarOutlined /> {t("agenda.today")}
                            </div>
                        </div>
                    </>
                }
            </div>
        )
})