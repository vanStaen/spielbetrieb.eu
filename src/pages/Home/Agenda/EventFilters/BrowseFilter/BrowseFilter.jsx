import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import * as dayjs from "dayjs";
import * as advancedFormat from "dayjs/plugin/advancedFormat";
import * as isoWeek from "dayjs/plugin/isoWeek";

import { pageStore } from "../../../../../store/pageStore/pageStore";
import { agendaStore } from "../../../../../store/agendaStore/agendaStore";

import "./BrowseFilter.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

const DATE_FORMAT_MONTH = "MMM, YYYY";
const DATE_FORMAT_CW = "ww, YYYY";
const DATE_FORMAT_DAY = "DD MMM, YYYY";

export const BrowseFilter = observer(() => {
  const { t } = useTranslation();
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [filterText, setFilterText] = useState(
    dayjs().format(DATE_FORMAT_MONTH),
  );
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (throttling.current === false) {
      throttling.current = true;
      if (isRightSwipe) {
        handleChangeZeitRaumClick(false);
      } else if (isLeftSwipe) {
        handleChangeZeitRaumClick(true);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "arrowleft") {
      event.preventDefault();
      handleChangeZeitRaumClick(false);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      handleChangeZeitRaumClick(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownEventHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  const handleChangeZeitRaumClick = (add) => {
    let newFilterDateFrom;
    if (add) {
      newFilterDateFrom = dayjs(agendaStore.filterDateFrom).add(
        1,
        agendaStore.timeSpan,
      );
    } else {
      newFilterDateFrom = dayjs(agendaStore.filterDateFrom).subtract(
        1,
        agendaStore.timeSpan,
      );
    }
    agendaStore.setFilterDateFrom(newFilterDateFrom);
    agendaStore.fetchEvents();
    updateTimeSpanDisplay(agendaStore.timeSpan, newFilterDateFrom);
  };

  const timeSpanChange = (newFormat) => {
    agendaStore.setTimeSpan(newFormat);
    agendaStore.fetchEvents();
    updateTimeSpanDisplay(newFormat, agendaStore.filterDateFrom);
    handleHideMenu();
  };

  const updateTimeSpanDisplay = (newtimeSpan, newFilterDateFrom) => {
    let browseFilterText;
    if (newtimeSpan === "month") {
      browseFilterText = newFilterDateFrom.format(DATE_FORMAT_MONTH);
    } else if (newtimeSpan === "week") {
      browseFilterText = (
        <>
          <span style={{ opacity: 0.5 }}>{t("agenda.week")} </span>
          {newFilterDateFrom.format(DATE_FORMAT_CW)}
        </>
      );
    } else if (newtimeSpan === "day") {
      browseFilterText = newFilterDateFrom.format(DATE_FORMAT_DAY);
    }
    setFilterText(browseFilterText);
  };

  const handleHideMenu = () => {
    const elementContainer = document.getElementById(
      "browseFilter__menuContainer",
    );
    elementContainer.style.opacity = 0;
    setTimeout(function () {
      setShowFormatMenu(false);
    }, 300);
  };

  const resetHandler = () => {
    agendaStore.setFilterDateFrom(dayjs());
    agendaStore.setTimeSpan("day");
    agendaStore.fetchEvents();
    updateTimeSpanDisplay("day", dayjs());
    handleHideMenu(true);
  };

  return (
    <div
      className="browseFilter__container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={() => onTouchEnd()}
    >
      <div className="browseFilter__text">
        <CaretLeftOutlined
          className="browseFilter__logo"
          onClick={() => handleChangeZeitRaumClick(false)}
        />{" "}
        <span onClick={() => setShowFormatMenu(!showFormatMenu)}>
          {filterText}
        </span>{" "}
        <CaretRightOutlined
          className="browseFilter__logo browseFilter__logoRight"
          onClick={() => handleChangeZeitRaumClick(true)}
        />
      </div>
      {showFormatMenu && (
        <>
          <div
            className="browseFilter__silentBackground"
            onClick={handleHideMenu}
          ></div>
          <div
            className={`browseFilter__menuContainer ${pageStore.selectedTheme === "light" ? "lightColorTheme__Menu" : "darkColorTheme__Menu"}`}
            id="browseFilter__menuContainer"
          >
            <div
              className={`browseFilter__menuElement menu__element ${agendaStore.timeSpan === "month" && "menu__elementSelected"}`}
              onClick={() => timeSpanChange("month")}
            >
              {dayjs(agendaStore.filterDateFrom).format(DATE_FORMAT_MONTH)}
            </div>
            <div
              className={`browseFilter__menuElement menu__element ${agendaStore.timeSpan === "week" && "menu__elementSelected"}`}
              onClick={() => timeSpanChange("week")}
            >
              {t("agenda.week")}{" "}
              {dayjs(agendaStore.filterDateFrom).format(DATE_FORMAT_CW)}
            </div>
            <div
              className={`browseFilter__menuElement menu__element ${agendaStore.timeSpan === "day" && "menu__elementSelected"}`}
              onClick={() => timeSpanChange("day")}
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
      )}
    </div>
  );
});
