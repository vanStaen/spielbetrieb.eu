import React, { useEffect } from "react";
import { Tag } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import * as dayjs from "dayjs";

import { agendaStore } from "../../../store/agendaStore/agendaStore";
import { pageStore } from "../../../store/pageStore/pageStore";
import { getSingleEvents } from "./getSingleEvents";
import { nameParser } from "../../../helpers/nameParser";

import "./EventPage.less";

export const EventPage = observer(() => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const event = agendaStore.selectedEvent || null;

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

  const fetchEventData = async (id) => {
    const eventFound = await getSingleEvents(id);
    agendaStore.setSelectedEvent(eventFound);
  };

  useEffect(() => {
    if (agendaStore.selectedEvent === null) {
      agendaStore.fetchTags();
      agendaStore.fetchEventtypes();
      fetchEventData(params.id);
    }
  }, []);

  /* TODO:
      show number of attending
      Mark attending event 
      buy a ticket Ticket
  */

  const eventTags = () => {
    const eventTags = event?.eventTags?.map((tagId) => {
      return {
        name: nameParser(
          agendaStore.tags.filter((tag) => parseInt(tag._id) === tagId)[0]
            ?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        ),
        id: tagId,
      };
    });
    eventTags?.splice(0, 0, {
      name: nameParser(
        agendaStore.eventtypes.filter((eventtype) => parseInt(eventtype._id) === event?.eventtype)[0]
          ?.name,
        pageStore.selectedLanguage?.toLowerCase(),
      ),
      id: event?.eventtype,
    });
    const tagsFormatted = eventTags?.map(
      (tag) => {
        return (
          <Tag key={tag.id} bordered={false}>
            #{tag.name}
          </Tag>
        );
      },
    );
    return tagsFormatted;
  }


  const isInThePast = event?.fromDate < dayjs();

  const handleEventContainerClick = () => {
    const elementContainer = document.getElementById(
      `eventContainer${event?._id}`,
    );
    elementContainer.style.maxHeight = "400px";
    elementContainer.classList.remove("eventpage__ContainerPast");
  };

  return (
    <>
      {event !== null && (
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
              {dayjs(event?.fromDate).format("DD")}
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
            <div className="eventpage__tags">{eventTags()}</div>
          </div>
        </div>
      )}
    </>
  );
});
