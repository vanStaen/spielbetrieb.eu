import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
// eslint-disable-next-line no-unused-vars
import * as customParseFormat from "dayjs/plugin/customParseFormat";
// eslint-disable-next-line no-unused-vars
import * as weekOfYear from "dayjs/plugin/weekOfYear";

import { pageStore } from "../../../../../store/pageStore/pageStore";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";
import {
  DATE_FORMAT_MONTH,
  DATE_FORMAT_CW,
  DATE_FORMAT_DAY,
} from "../../../../../lib/data/dateFormat";

import "./BrowseFilter.less";

export const BrowseFilter = observer(() => {
  const { t } = useTranslation();
  const params = useParams();

  const [filterText, setFilterText] = useState(
    dayjs().format(DATE_FORMAT_MONTH),
  );
  const [showFormatMenu, setShowFormatMenu] = useState(false);

  const week = params.week;
  const year = params.year;
  const month = params.month;
  const day = params.day;

  useEffect(() => {
    if (week) {
      spielplanStore.setTimeSpan("week");
      const newDate = dayjs(`${year}-01-01`).week(week);
      spielplanStore.setFilterDateFrom(newDate);
      spielplanStore.fetchEvents();
    } else if (day) {
      spielplanStore.setTimeSpan("day");
      const newDate = dayjs(`${year}.${month}.${day}`).format("YYYY.MM.DD");
      spielplanStore.setFilterDateFrom(newDate);
      spielplanStore.fetchEvents();
    } else if (month) {
      spielplanStore.setTimeSpan("month");
      const newDate = dayjs(`${year}.${month}.01`).format("YYYY.MM.DD");
      spielplanStore.setFilterDateFrom(newDate);
      spielplanStore.fetchEvents();
    }
  }, []);

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "arrowleft") {
      event.preventDefault();
      spielplanStore.calculateFilterDateFrom(false);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      spielplanStore.calculateFilterDateFrom(true);
    }
  };

  const setTimeSpanDisplay = (newtimeSpan, newFilterDateFrom) => {
    let browseFilterText;
    if (newtimeSpan === "month") {
      browseFilterText = newFilterDateFrom.format(DATE_FORMAT_MONTH);
    } else if (newtimeSpan === "week") {
      browseFilterText = (
        <>
          <span style={{ opacity: 0.5 }}>{t("spielplan.week")} </span>
          {newFilterDateFrom.format(DATE_FORMAT_CW)}
        </>
      );
    } else if (newtimeSpan === "day") {
      browseFilterText = newFilterDateFrom.format(DATE_FORMAT_DAY);
    } else if (newtimeSpan === "all") {
      browseFilterText = 'all events';
    }
    setFilterText(browseFilterText);
  };

  useEffect(() => {
    setTimeSpanDisplay(spielplanStore.timeSpan, spielplanStore.filterDateFrom);
    const year = dayjs(spielplanStore.filterDateFrom).format("YYYY");
    if (spielplanStore.timeSpan === "week") {
      const week = dayjs(spielplanStore.filterDateFrom).format("ww");
      const nextURL = `${process.env.HOST_URL}/spielplan/week/${year}/${week}/`;
      const nextState = { calendarWeek: week, year };
      window.history.replaceState(nextState, "", nextURL);
    } else {
      const month = dayjs(spielplanStore.filterDateFrom).format("MM");
      if (spielplanStore.timeSpan === "month") {
        const nextURL = `${process.env.HOST_URL}/spielplan/${year}/${month}/`;
        const nextState = { month, year };
        window.history.replaceState(nextState, "", nextURL);
      } else if (spielplanStore.timeSpan === "day") {
        const day = dayjs(spielplanStore.filterDateFrom).format("DD");
        const nextURL = `${process.env.HOST_URL}/spielplan/${year}/${month}/${day}/`;
        const nextState = { day, month, year };
        window.history.replaceState(nextState, "", nextURL);
      }
    }
  }, [spielplanStore.timeSpan, spielplanStore.filterDateFrom]);

  useEffect(() => {
    window.addEventListener("keydown", keydownEventHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  const timeSpanChange = (newFormat) => {
    spielplanStore.setTimeSpan(newFormat);
    spielplanStore.fetchEvents();
    handleHideMenu();
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
    spielplanStore.setFilterDateFrom(dayjs());
    spielplanStore.setTimeSpan("day");
    spielplanStore.fetchEvents();
    handleHideMenu(true);
  };


  const allHandler = () => {
    spielplanStore.setFilterDateFrom(dayjs());
    spielplanStore.setTimeSpan("all");
    spielplanStore.fetchEvents();
    handleHideMenu(true);
  };

  return (
    <div className="browseFilter__container">
      <div>
        <CaretLeftOutlined
          className={`browseFilter__logo ${spielplanStore.timeSpan  === 'all' && 'browseFilter__logoDisabled'}`}
          onClick={() => spielplanStore.calculateFilterDateFrom(false)}
        />{" "}
        <span 
          onClick={() => setShowFormatMenu(!showFormatMenu)}
          className={spielplanStore.timeSpan  === 'all' && 'browseFilter__textDisabled'}
        >
          {filterText}
        </span>{" "}
        <CaretRightOutlined
          className={`browseFilter__logo browseFilter__logoRight ${spielplanStore.timeSpan === 'all' && 'browseFilter__logoDisabled'}`}
          onClick={() => spielplanStore.calculateFilterDateFrom(true)}
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
              className={`browseFilter__menuElement menu__element ${spielplanStore.timeSpan === "month" && "menu__elementSelected"}`}
              onClick={() => timeSpanChange("month")}
            >
              {dayjs(spielplanStore.filterDateFrom).format(DATE_FORMAT_MONTH)}
            </div>
            <div
              className={`browseFilter__menuElement menu__element ${spielplanStore.timeSpan === "week" && "menu__elementSelected"}`}
              onClick={() => timeSpanChange("week")}
            >
              {t("spielplan.week")}{" "}
              {dayjs(spielplanStore.filterDateFrom).format(DATE_FORMAT_CW)}
            </div>
            <div
              className={`browseFilter__menuElement menu__element ${spielplanStore.timeSpan === "day" && "menu__elementSelected"}`}
              onClick={() => timeSpanChange("day")}
            >
              {dayjs(spielplanStore.filterDateFrom).format(DATE_FORMAT_DAY)}
            </div>
            <div className="menu__whiteline"></div>
            <div
              className="browseFilter__menuElement menu__element"
              onClick={resetHandler}
            >
              <CalendarOutlined /> {t("spielplan.today")}
            </div>
            <div
              className="browseFilter__menuElement menu__element"
              onClick={allHandler}
            >
              All events
            </div>
          </div>
        </>
      )}
    </div>
  );
});
