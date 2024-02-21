import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";

import { pageStore } from "../../../../../store/pageStore/pageStore";
import { agendaStore } from "../../../../../store/agendaStore/agendaStore";
import { DATE_FORMAT_MONTH, DATE_FORMAT_CW, DATE_FORMAT_DAY } from "../../../../../lib/data/dateFormat";

import "./BrowseFilter.less";

export const BrowseFilter = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const [filterText, setFilterText] = useState(dayjs().format(DATE_FORMAT_MONTH));
  const [showFormatMenu, setShowFormatMenu] = useState(false);

  const week = params.week;
  const year = params.year;
  const month = params.month;
  const day = params.day;

  {/*
  if (week) {
    agendaStore.setTimeSpan("week");
    const newDate = dayjs(`${year}-${month}`).format("YYYY-ww");
    //agendaStore.setFilterDateFrom()
  } else if (day) {
    agendaStore.setTimeSpan("day"); 
    const newDate = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");   
    //agendaStore.setFilterDateFrom();
  } else if (month) {
    agendaStore.setTimeSpan("month");
    const newDate = dayjs(`${year}-${month}`).format("YYYY-MM");   
    //agendaStore.setFilterDateFrom();
  };
  */}

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "arrowleft") {
      event.preventDefault();
      agendaStore.calculateFilterDateFrom(false);
    } else if (keyPressed === "arrowright") {
      event.preventDefault();
      agendaStore.calculateFilterDateFrom(true);
    }
  };

  const setTimeSpanDisplay = (newtimeSpan, newFilterDateFrom) => {
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

  useEffect(() => {
    setTimeSpanDisplay(agendaStore.timeSpan, agendaStore.filterDateFrom);
    const year = dayjs(agendaStore.filterDateFrom).format("YYYY");
    if (agendaStore.timeSpan === "week") {
      const week = dayjs(agendaStore.filterDateFrom).format("ww");
      navigate(`../agenda/week/${week}/`);
    } else {
      const month = dayjs(agendaStore.filterDateFrom).format("MM");
      if (agendaStore.timeSpan === "month") {
        navigate(`../agenda/${year}/${month}/`);
      } else if (agendaStore.timeSpan === "day") {
        const day = dayjs(agendaStore.filterDateFrom).format("DD");
        navigate(`../agenda/${year}/${month}/${day}/`);
      };
    } 
  }, [agendaStore.timeSpan, agendaStore.filterDateFrom]);

  useEffect(() => {
    window.addEventListener("keydown", keydownEventHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  const timeSpanChange = (newFormat) => {
    agendaStore.setTimeSpan(newFormat);
    agendaStore.fetchEvents();
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
    agendaStore.setFilterDateFrom(dayjs());
    agendaStore.setTimeSpan("day");
    agendaStore.fetchEvents();
    handleHideMenu(true);
  };

  return (
    <div
      className="browseFilter__container"
    >
      <div className="browseFilter__text">
        <CaretLeftOutlined
          className="browseFilter__logo"
          onClick={() => agendaStore.calculateFilterDateFrom(false)}
        />{" "}
        <span onClick={() => setShowFormatMenu(!showFormatMenu)}>
          {filterText}
        </span>{" "}
        <CaretRightOutlined
          className="browseFilter__logo browseFilter__logoRight"
          onClick={() => agendaStore.calculateFilterDateFrom(true)}
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
