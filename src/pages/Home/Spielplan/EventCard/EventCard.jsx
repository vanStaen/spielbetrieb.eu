import React, { useEffect, useRef, useState } from "react";
import { Tag, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import dayjs from "dayjs";

import { spielplanStore } from "../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { CustomSpinner } from "../../../../components/CustomSpinner/CustomSpinner";
import { pictureOrPlaceholder } from "../../../../helpers/picture/pictureOrPlaceholder";
import { deleteEvent } from "../../../Admin/AdminEvents/deleteEvent";
import { userStore } from "../../../../store/userStore/userStore";

import "./EventCard.less";

export const EventCard = observer((props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { event, tags, userName, profileCard } = props;
  const isInThePast = event.fromDate < dayjs();
  const isShownHidden = useRef(isInThePast);
  const [firstPictureUrl, setFirstPictureUrl] = useState(null);

  const handleDeleteEvent = async () => {
    await deleteEvent(event._id);
    spielplanStore.fetchEvents();
  };

  const getFirstPictureUrl = async () => {
    const picture = await pictureOrPlaceholder(event);
    setFirstPictureUrl(picture);
  };

  useEffect(() => {
    getFirstPictureUrl();
  }, []);

  /* TODO:
        show number of attending
        Mark attending event 
        buy a ticket Ticket
    */

  const handleTagClick = (index, id) => {
    if (index === 0) {
      if (!spielplanStore.filterEventtypes.includes(String(id))) {
        const newArrayFilterEventtypes =
          spielplanStore.filterEventtypes.slice();
        newArrayFilterEventtypes.push(String(id));
        spielplanStore.setFilterEventtypes(newArrayFilterEventtypes);
      }
    } else {
      if (!spielplanStore.filterTags.includes(String(id))) {
        const newArrayFilterTags = spielplanStore.filterTags.slice();
        newArrayFilterTags.push(String(id));
        spielplanStore.setFilterTags(newArrayFilterTags);
      }
    }
  };

  const tagsFormatted = tags?.map((tag, index) => {
    return (
      <Tag
        key={tag.id}
        bordered={false}
        onClick={(event) => {
          event.stopPropagation();
          handleTagClick(index, tag.id);
        }}
      >
        #{tag.name}
      </Tag>
    );
  });

  const handleEventContainerClick = () => {
    if (isShownHidden.current === true) {
      const elementContainer = document.getElementById(
        `eventContainer${event._id}`,
      );
      elementContainer.style.maxHeight = "400px";
      elementContainer.classList.remove("event__ContainerPast");
      isShownHidden.current = false;
    } else {
      navigate(`/event/${event._id}`, { relative: "path" });
      spielplanStore.setSelectedEvent(event);
    }
  };

  const fromUntilDateAreTheSame =
    dayjs(event.fromDate).valueOf === dayjs(event.untilDate).valueOf;

  const fromUntilDateAreNull =
    dayjs(event.fromDate).format("HH:mm") === "00:00";

  return (
    <div
      key={event._id}
      id={`eventContainer${event._id}`}
      className={`
        event__Container 
        ${pageStore.selectedTheme === "light" ? "event__black" : "event__white"}
        ${!profileCard && "event__containerMarginTop"}
        `}
      onClick={handleEventContainerClick}
    >
      <div className="event__date">
        <div className="event__dateYear">
          {dayjs(event.fromDate).format("YYYY")}
        </div>
        <div className="event__dateDayOfWeek">
          {dayjs(event.fromDate).format("ddd")}
        </div>
        <div
          className={`event__dateDay ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
        >
          {dayjs(event.fromDate).format("DD")}
        </div>
        <div className="event__dateMonth">
          {dayjs(event.fromDate).format("MMM")}
        </div>
      </div>

      {firstPictureUrl ? (
        <div className={profileCard ? 'event__artworkProfile' : 'event__artwork'}>
          <img src={firstPictureUrl} />
        </div>
      ) : (
        <div className="event__artworkLoading">
          <CustomSpinner />
        </div>
      )}
      <div className="event__main">
        <div className="event__titleLocation">
          <div className="event__location">{event.locationName}</div>
          <div
            className={`
              ${profileCard ? "event__titleProfile" : "event__title"}
              ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}
              `}
          >
            {event.title}
          </div>
        </div>
        <div className="event__time">
          <ClockCircleOutlined />{" "}
          {!fromUntilDateAreNull ? (
            <>
              {dayjs(event.fromDate).format("HH:mm")}
              {!fromUntilDateAreTheSame && (
                <> - {dayjs(event.untilDate).format("HH:mm")}</>
              )}
            </>
          ) : (
            "tba"
          )}
        </div>
        <div className="event__location">
          <EnvironmentOutlined />{" "}
          {event.locationAddress ? event.locationAddress : "tba"}
        </div>
        {!profileCard && (
          <div className="event__promoter">
            <span className="event__organizedBy">
              {t("spielplan.eventOrganisedBy")}{" "}
            </span>
            {userName}
          </div>
        )}
        <div className={profileCard ? "event__tagsProfile" : "event__tags"} > {tagsFormatted}</div>
      </div>
      {
        userStore.isAdmin && (
          <div className="event__delete">
            <div onClick={(e) => e.stopPropagation()}>
              <Popconfirm
                title={`Delete this event?`}
                style={{ marginRight: 8 }}
                onConfirm={handleDeleteEvent}
              >
                <DeleteOutlined className="event__deleteLogo" />
              </Popconfirm>
            </div>
          </div>
        )
      }
    </div >
  );
});
