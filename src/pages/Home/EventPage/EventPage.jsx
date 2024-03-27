import React, { useEffect } from "react";
import { Tag } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
  TagOutlined,
  AimOutlined,
  EuroOutlined,
  InfoCircleOutlined,
  TagsOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

import { spielplanStore } from "../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../store/pageStore/pageStore";
import { getSingleEvents } from "./getSingleEvents";
import { nameParser } from "../../../helpers/nameParser";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";

import artwork from '../../../img/artworks/ak03.jpg';

import "./EventPage.less";
import "./EventPageColors.less";

export const EventPage = observer(() => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const event = spielplanStore.selectedEvent || null;

  console.log("event", event);

  const keydownEventHandler = (event) => {
    const keyPressed = event.key.toLowerCase();
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
    spielplanStore.setSelectedEvent(eventFound);
  };

  useEffect(() => {
    if (spielplanStore.selectedEvent === null) {
      spielplanStore.fetchTags();
      spielplanStore.fetchEventtypes();
      fetchEventData(params.id);
    }
  }, []);

  const eventTags = () => {
    const eventTags = event?.eventTags?.map((tagId) => {
      return {
        name: nameParser(
          spielplanStore.tags.filter((tag) => parseInt(tag._id) === tagId)[0]
            ?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        ),
        id: tagId,
      };
    });
    eventTags?.splice(0, 0, {
      name: nameParser(
        spielplanStore.eventtypes.filter(
          (eventtype) => parseInt(eventtype._id) === event?.eventtype,
        )[0]?.name,
        pageStore.selectedLanguage?.toLowerCase(),
      ),
      id: event?.eventtype,
    });

    const tagsFormatted = eventTags?.map((tag) => {
      return (
        <Tag key={tag.id} bordered={false}>
          #{tag.name}
        </Tag>
      );
    });

    return tagsFormatted;
  };

  const eventType = spielplanStore.eventtypes?.filter(
    (et) => parseInt(et._id) === event?.eventtype,
  )[0];

  return (
    <div
      className={`eventpage__container 
                ${pageStore.selectedTheme === "light"
                ? "black"
                : "white"
              }`}
    >
      {event !== null ? (
        <>
          {/*<div
            onClick={() => {
              navigate(-1);
            }}
            className={`eventpage__back link 
                      ${pageStore.selectedTheme === "light"
                ? "lightColorTheme__Text"
                : "darkColorTheme__Text"
              }`}
          >
            <ArrowLeftOutlined />
            </div>*/}
          <div className="eventpage__artworkCol">
            <div className="eventpage__artworkContainer">
              <img src={artwork} className="eventpage__artwork" />
            </div>
          </div>
          <div className="eventpage__descCol">
            <div className="eventpage__title">{event.title}</div>
            <div className="eventpage__date">
              <span className="eventpage__weekday">
                {dayjs(event.fromDate).format("dddd")}
              </span>{" "}
              <span className="eventpage__daymonth">
                {dayjs(event.fromDate).format("DD MMMM")}
              </span>{" "}
              <span className="eventpage__year">
                {dayjs(event.fromDate).format("YYYY")}
              </span>
            </div>
            <div className="eventpage__typeLocation">
              <span className="eventpage__typeLocationSpan">
                <TagOutlined className="eventpage__typeLocationIcon" />{" "}
                {nameParser(eventType?.name, pageStore.selectedLanguage)}
              </span>
              <span className="eventpage__typeLocationSpan">
                <EnvironmentOutlined className="eventpage__typeLocationIcon" />{" "}
                {event.locationName}
              </span>
            </div>
            <div className="eventpage__descContainer">
              <div className="eventpage__descTitle">
                Event description
              </div>
              <div className="eventpage__desc">
                {event.description}
              </div>
            </div>
            <div className="eventpage__infoContainer">
              <div className="eventpage__infoTitle">
                Event infos
              </div>
              <div className="eventpage__info">
                <div className="eventpage__subInfo">
                  <ClockCircleOutlined className="eventpage__infoIcon" />{" "}
                  {dayjs(event.fromDate).format("dddd") ===
                    dayjs(event.untilDate).format("dddd") ? (
                    <>
                      {dayjs(event.fromDate).format("HH:mm")} {t("spielplan.until")}{" "}
                      {dayjs(event.untilDate).format("HH:mm")}
                    </>
                  ) : (
                    <>
                      {dayjs(event.fromDate).format("dddd HH:mm")}{" "}
                      {t("spielplan.until")}{" "}
                      {dayjs(event.untilDate).format("dddd HH:mm")}
                    </>
                  )}
                </div>
                <div className="eventpage__subInfo">
                  <EuroOutlined  className="eventpage__infoIcon" />{" "}
                  22€ (tickets online) - 25€ (at the door)
                </div>
                <div className="eventpage__subInfo">
                  <InfoCircleOutlined  className="eventpage__infoIcon" />{" "}
                  This is an 21+ event, with dresscode
                </div>
                <div className="eventpage__tags">
                  <TagsOutlined  className="eventpage__infoIcon" />{" "}
                  {eventTags()}
                </div>
              </div>
            </div>
            <div className="eventpage__locationContainer">
              <div className="eventpage__locationTitle">
                  Location
                </div>
                <div className="eventpage__location">
                  <div className="eventpage__subInfo">{event.locationName}</div>
                  <div className="eventpage__subInfo">{event.locationAddress}</div>
                </div>
            </div>
          </div>
          {/* 
            
            <div className="eventpage__time">
              <ClockCircleOutlined />{" "}
              {dayjs(event.fromDate).format("dddd") ===
                dayjs(event.untilDate).format("dddd") ? (
                <>
                  {dayjs(event.fromDate).format("HH:mm")} {t("spielplan.until")}{" "}
                  {dayjs(event.untilDate).format("HH:mm")}
                </>
              ) : (
                <>
                  {dayjs(event.fromDate).format("dddd HH:mm")}{" "}
                  {t("spielplan.until")}{" "}
                  {dayjs(event.untilDate).format("dddd HH:mm")}
                </>
              )}
              <div className="eventpage__location">
                <a
                  href={`https://www.google.com/maps/@${event.locationCoordinates}`}
                  className="eventpage__location"
                  target="_blank"
                  rel="noreferrer"
                >
                  <EnvironmentOutlined /> {event.locationAddress}
                </a>
              </div>
              <br />
              
              <div className="eventpage__desc">{event.description}</div>
              <br />
              <div className="eventpage__promoter">
                <span className="eventpage__organizedBy">
                  {t("spielplan.eventOrganisedBy")}{" "}
                </span>
                <Link to={`/user/${event.user?.userName}`} relative="path">
                  <span className="link">{event.user?.userName}</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="eventpage__tags">{eventTags()}</div>
          */}
        </>
      ) : 'Loading'}
      <HelpButtons />
    </div>
  );
});
