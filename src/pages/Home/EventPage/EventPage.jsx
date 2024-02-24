import React, { useEffect } from "react";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation, } from "react-i18next";
import { observer } from "mobx-react";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import * as dayjs from "dayjs";

import { agendaStore } from "../../../store/agendaStore/agendaStore";

import "./EventPage.less";

export const EventPage = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const event = agendaStore.selectedEvent;

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
    console.log(keyPressed);
    if (keyPressed === "backspace" || keyPressed === "escape") {
      event.preventDefault();
      navigate(-1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownEventHandler);
    return () => {
      window.removeEventListener("keydown", keydownEventHandler);
    };
  }, []);

  /* TODO:
      show number of attending
      Mark attending event 
      buy a ticket Ticket
  */

  const tagsFormatted = agendaStore.selectedEvent.eventTags?.map((tag, index) => {
    return (
      <Tag
        key={tag.id}
        bordered={false}
      >
        #{tag.name}
      </Tag>
    );
  });

  const isInThePast = event.fromDate < dayjs();

  const handleEventContainerClick = () => {
    const elementContainer = document.getElementById(
      `eventContainer${event._id}`,
    );
    elementContainer.style.maxHeight = "400px";
    elementContainer.classList.remove("eventpage__ContainerPast");
  };

  return (
    <div
      key={event._id}
      id={`eventContainer${event._id}`}
      className={`eventpage__Container ${isInThePast && "eventpage__ContainerPast"}`}
      onClick={handleEventContainerClick}
    >
      <div className="eventpage__date">
        <div className="eventpage__dateYear">
          {dayjs(event.fromDate).format("YYYY")}
        </div>
        <div className="eventpage__dateDayOfWeek">
          {dayjs(event.fromDate).format("ddd")}
        </div>
        <div className="eventpage__dateDay">
          {dayjs(event.fromDate).format("DD")}
        </div>
        <div className="eventpage__dateMonth">
          {dayjs(event.fromDate).format("MMM")}
        </div>
      </div>
      <div className="eventpage__main">
        <div className="eventpage__titleLocation">
          <div className="eventpage__location">{event.locationName} </div>
          <div className="eventpage__title">{event.title}</div>
          <div className="eventpage__desc">{event.description}</div>
        </div>
        <div className="eventpage__timelocation">
          <ClockCircleOutlined /> {dayjs(event.fromDate).format("HH:mm")} -{" "}
          {dayjs(event.untilDate).format("HH:mm")}
        </div>
        <div className="eventpage__timelocation">
          <EnvironmentOutlined /> {event.locationAddress}
        </div>
        <div className="eventpage__promoter">
          <span className="eventpage__organizedBy">
            {t("agenda.eventOrganisedBy")}{" "}
          </span>
          {event.user.userName}
        </div>
        <div className="eventpage__tags">{tagsFormatted}</div>
      </div>
    </div>
  );
});
