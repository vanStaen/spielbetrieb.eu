import React from "react";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import * as dayjs from "dayjs";

import { agendaStore } from "../../../../store/agendaStore/agendaStore";

import "./EventCard.less";
import "./EventColors.less";
import { observer } from "mobx-react";

export const EventCard = observer((props) => {
  const { t } = useTranslation();
  const { event, color, tags } = props;

  /* TODO:
        show number of attending
        Mark attending event 
        buy a ticket Ticket
    */

  const handleTagClick = (index, id) => {
    if (index === 0) {
      if (!agendaStore.filterEventtypes.includes(String(id))) {
        const newArrayFilterEventtypes = agendaStore.filterEventtypes.slice();
        newArrayFilterEventtypes.push(String(id));
        agendaStore.setFilterEventtypes(newArrayFilterEventtypes);
      }
    } else {
      if (!agendaStore.filterTags.includes(String(id))) {
        const newArrayFilterTags = agendaStore.filterTags.slice();
        newArrayFilterTags.push(String(id));
        agendaStore.setFilterTags(newArrayFilterTags);
      }
    }
  };

  const tagsFormatted = tags?.map((tag, index) => {
    return (
      <Tag
        key={tag.id}
        bordered={false}
        onClick={() => {
          handleTagClick(index, tag.id);
        }}
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
    elementContainer.classList.remove("event__ContainerPast");
  };

  return (
    <div
      key={event._id}
      id={`eventContainer${event._id}`}
      className={`event__Container ${isInThePast && "event__ContainerPast"} ${"color" + color}`}
      onClick={handleEventContainerClick}
    >
      <div className="event__date">
        <div className="event__dateYear">
          {dayjs(event.fromDate).format("YYYY")}
        </div>
        <div className="event__dateDayOfWeek">
          {dayjs(event.fromDate).format("ddd")}
        </div>
        <div className="event__dateDay">
          {dayjs(event.fromDate).format("DD")}
        </div>
        <div className="event__dateMonth">
          {dayjs(event.fromDate).format("MMM")}
        </div>
      </div>
      <div className="event__main">
        <div className="event__titleLocation">
          <div className="event__location">{event.locationName} </div>
          <div className="event__title">{event.title}</div>
        </div>
        <div className="event__timelocation">
          <ClockCircleOutlined /> {dayjs(event.fromDate).format("HH:mm")} -{" "}
          {dayjs(event.untilDate).format("HH:mm")}
        </div>
        <div className="event__timelocation">
          <EnvironmentOutlined /> {event.locationAddress}
        </div>
        <div className="event__promoter">
          <span className="event__organizedBy">
            {t("agenda.eventOrganisedBy")}{" "}
          </span>
          {event.user.userName}
        </div>
        <div className="event__tags">{tagsFormatted}</div>
      </div>
    </div>
  );
});
