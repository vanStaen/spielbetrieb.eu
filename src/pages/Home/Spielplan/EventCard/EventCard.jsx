import React, { useEffect, useRef, useState } from "react";
import { Tag, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import dayjs from "dayjs";

import { spielplanStore } from "../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { CustomSpinner } from "../../../../components/CustomSpinner/CustomSpinner";
import { Banner } from "../../../../components/Banner/Banner";
import { pictureOrPlaceholder } from "../../../../helpers/picture/pictureOrPlaceholder";
import { getPictureUrl } from "../../../../helpers/picture/getPictureUrl";
import { archiveEvent } from "./archiveEvent";
import { userStore } from "../../../../store/userStore/userStore";
import { eventFormStore } from "../../Event/EventForm/eventFormStore";

import "./EventCard.less";

export const EventCard = observer((props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { event, tags, eventUser, profileCard } = props;
  const isInThePast = event.fromDate < dayjs();
  const isShownHidden = useRef(isInThePast);
  const [firstPictureUrl, setFirstPictureUrl] = useState(null);

  const isMyEvent = eventUser?.id === userStore?.id;

  const handleArchiveEvent = async () => {
    await archiveEvent(event.id);
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
        buy a ticket
    */

  const handleTagClick = (index, id) => {
    if (profileCard) {
      handleEventContainerClick();
    } else {
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

  const handleEventContainerClick = (e) => {
    if (event.isDraft) {
      handleEditEvent(e);
    } else if (isShownHidden.current === true) {
      const elementContainer = document.getElementById(
        `eventContainer${event.id}`,
      );
      elementContainer.style.maxHeight = "400px";
      elementContainer.classList.remove("event__ContainerPast");
      isShownHidden.current = false;
    } else {
      navigate(`/event/${event.id}`, { relative: "path" });
      spielplanStore.setSelectedEvent(event);
    }
  };

  const getUrlsFromPicturePath = async (pictures) => {
    const urls = await Promise.all(
      pictures.map((picture) => {
        return getPictureUrl(picture, "events");
      }),
    );
    return urls;
  };

  const handleEditEvent = async (e) => {
    e.stopPropagation();
    navigate("/event/add");
    await eventFormStore.setEventId(event.id);
    await eventFormStore.setTitle(event.title);
    await eventFormStore.setEventtype(event.eventtype);
    await eventFormStore.setDescription(event.description);
    await eventFormStore.setLocationId(event.location);
    await eventFormStore.setLocationName(event.locationName);
    await eventFormStore.setLocationAddress(event.locationAddress);
    await eventFormStore.setArtworks(event.pictures);
    await eventFormStore.setEventTags(event.eventTags);
    await eventFormStore.setLineUp(event.lineUp);
    await eventFormStore.setLinks(event.links);
    await eventFormStore.setAgeMin(event.ageMin);
    await eventFormStore.setIsPrivate(event.private);
    await eventFormStore.setForwardable(event.forwardable);
    await eventFormStore.setHasDresscode(event.hasDresscode);
    await eventFormStore.setDresscodeDoTags(event.dresscodeDoTags);
    await eventFormStore.setDresscodeDontTags(event.dresscodeDontTags);
    await eventFormStore.setEquipment(event.equipment);
    await eventFormStore.setArtworksUrl(
      await getUrlsFromPicturePath(event.pictures),
    );
    event.fromDate && (await eventFormStore.setFromDate(dayjs(event.fromDate)));
    event.untilDate &&
      (await eventFormStore.setUntilDate(dayjs(event.untilDate)));
    event.prices?.length &&
      (await eventFormStore.setPrices(JSON.parse(event.prices)));
  };

  const fromUntilDateAreTheSame =
    dayjs(event.fromDate).valueOf === dayjs(event.untilDate).valueOf;

  const fromUntilDateAreNull =
    dayjs(event.fromDate).format("HH:mm") === "00:00";

  return (
    <>
      <div
        key={event.id}
        id={`eventContainer${event.id}`}
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
          <div
            className={profileCard ? "event__artworkProfile" : "event__artwork"}
          >
            <img src={firstPictureUrl} />
          </div>
        ) : (
          <div
            className={
              profileCard
                ? "event__artworkLoadingProfile"
                : "event__artworkLoading"
            }
          >
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
          <div
            className={`event__location ${!event.locationAddress && "event__lowOpacity"}`}
          >
            <EnvironmentOutlined />{" "}
            {event.locationAddress ? event.locationAddress : "tba"}
          </div>
          {!profileCard && (
            <div className="event__promoter">
              <span className="event__organizedBy">
                {t("spielplan.eventOrganisedBy")}{" "}
              </span>
              {eventUser?.userName}
            </div>
          )}
          <div className={profileCard ? "event__tagsProfile" : "event__tags"}>
            {" "}
            {tagsFormatted}
          </div>
        </div>
        <div className="event__actions">
          {event.private && (
            <Tag className="gold" bordered={false}>
              Private
            </Tag>
          )}
          {!event.validated &&
            (event.isDraft ? (
              <Tag bordered={false}>Draft</Tag>
            ) : (
              <Tag className="lightRed" bordered={false}>
                Pending
              </Tag>
            ))}
          {isMyEvent && (
            <div className="event__action" onClick={handleEditEvent}>
              <EditOutlined />
            </div>
          )}
          {(isMyEvent || userStore.isAdmin) && (
            <div className="event__action">
              <div onClick={(e) => e.stopPropagation()}>
                <Popconfirm
                  title={`Archive this event?`}
                  style={{ marginRight: 8 }}
                  onConfirm={handleArchiveEvent}
                >
                  <DeleteOutlined className="event__deleteLogo" />
                </Popconfirm>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});
