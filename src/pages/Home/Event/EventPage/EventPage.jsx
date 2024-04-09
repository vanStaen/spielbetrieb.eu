import React, { useEffect, useState, useRef } from "react";
import { Tag, Button, Tour, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined,
  TagOutlined,
  EuroOutlined,
  InfoCircleOutlined,
  TagsOutlined,
  EditOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

import { spielplanStore } from "../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { getSingleEvents } from "../getSingleEvents";
import { nameParser } from "../../../../helpers/dev/nameParser";
import { HelpButtons } from "../../../../components/HelpButtons/HelpButtons";
import { CustomSpinner } from "../../../../components/CustomSpinner/CustomSpinnner";

import artwork from "../../../../img/artworks/ak03.jpg";
import artwork2 from "../../../../img/artworks/ak02.jpg";
import artwork3 from "../../../../img/artworks/ak01.jpg";

import "./EventPage.less";

export const EventPage = observer((props) => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { event } = props;
  const [startTour, setStartTour] = useState(false);
  const { Paragraph } = Typography;

  // console.log("event", event);

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
    if (event === null) {
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

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const eventPageTourSteps = [
    {
      title: "Artwork of the event",
      description:
        "This is the artwork provided by the promoter. Click to enlarge.",
      placement: "right",
      target: () => ref1.current,
    },
    {
      title: "Name of the event",
      description: "This is the name of the event as provided by the promoter.",
      target: () => ref2.current,
    },
    {
      title: "Basic details of the event",
      description: `This are date of when the event will take place. Underneath is the type of event (${nameParser(eventType?.name, pageStore.selectedLanguage)}), and the location`,
      target: () => ref3.current,
    },
    {
      title: "Description of the event",
      description:
        "This is the name of the event as provided by the promoter. In case this text is long, it may be partically hidden. Click on 'Read more' to see it in full",
      placement: "top",
      target: () => ref6.current,
    },
    {
      title: "More details about the event",
      description:
        "Here are more information about the event: exact time at when the event take place, the prices applicable, and more. A list of tags describing with key words the event may also be available.",
      placement: "top",
      target: () => ref4.current,
    },
    {
      title: "Exact information about the event Location",
      description:
        "You will find here address and a link to google map pointing to the event location.",
      placement: "top",
      target: () => ref5.current,
    },
  ];

  pageStore.setPicturesOverlayGallery([artwork, artwork2, artwork3]);

  return (
    <>
      <div className="eventpage__backgroundgradient"></div>
      <div
        className="eventpage__backgroundimage"
        style={{ background: `url(${artwork}) center center/cover` }}
      ></div>
      <div
        onClick={() => {
          navigate(-1);
        }}
        className={`eventpage__back link 
                  ${
                    pageStore.selectedTheme === "light"
                      ? "lightColorTheme__Text"
                      : "darkColorTheme__Text"
                  }`}
      >
        <ArrowLeftOutlined />
      </div>
      <div
        className={`eventpage__container 
                ${pageStore.selectedTheme === "light" ? "black" : "white"}`}
      >
        {event !== null ? (
          <>
            <div className="eventpage__artworkCol">
              <div
                className="eventpage__artworkContainer"
                ref={ref1}
                onClick={() => {
                  pageStore.setShowOverlayGallery(true);
                }}
              >
                <img src={artwork} className="eventpage__artwork" />
              </div>
            </div>
            <div className="eventpage__descCol">
              <div className="eventpage__title" ref={ref2}>
                {event.title}
              </div>
              <div ref={ref3}>
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
              </div>
              <div className="eventpage__descContainer">
                <div className="eventpage__descTitle">
                  Event description <EditOutlined className="editOutlined" />
                </div>
                <div className="eventpage__desc" ref={ref6}>
                  <Paragraph
                    className="eventpage__desc"
                    ellipsis={{ rows: 7, expandable: true, symbol: "more" }}
                  >
                    {event.description}
                  </Paragraph>
                </div>
              </div>
              <div className="eventpage__infoContainer">
                <div className="eventpage__infoTitle">
                  Event infos <EditOutlined className="editOutlined" />
                </div>
                <div className="eventpage__info" ref={ref4}>
                  <div className="eventpage__subInfo">
                    <ClockCircleOutlined className="eventpage__infoIcon" />{" "}
                    {dayjs(event.fromDate).format("dddd") ===
                    dayjs(event.untilDate).format("dddd") ? (
                      <>
                        {dayjs(event.fromDate).format("HH:mm")}{" "}
                        {t("spielplan.until")}{" "}
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
                    <EuroOutlined className="eventpage__infoIcon" /> 22€
                    (tickets online) - 25€ (at the door)
                  </div>
                  <div className="eventpage__subInfo">
                    <InfoCircleOutlined className="eventpage__infoIcon" /> This
                    is an 21+ event, with dresscode
                  </div>
                  <div className="eventpage__tags">
                    <TagsOutlined className="eventpage__infoIcon" />{" "}
                    {eventTags()}
                  </div>
                </div>
              </div>
              {event.lineup && (
                <div className="eventpage__lineupContainer">
                  <div className="eventpage__lineupTitle">
                    Line up <EditOutlined className="editOutlined" />
                  </div>
                  <div className="eventpage__lineup">
                    <div className="eventpage__subInfo">First Artist</div>
                    <div className="eventpage__subInfo">Second Artist</div>
                  </div>
                </div>
              )}
              <div className="eventpage__locationContainer">
                <div className="eventpage__locationTitle">
                  Location <EditOutlined className="editOutlined" />
                </div>
                <div className="eventpage__location" ref={ref5}>
                  <div className="eventpage__subInfo">{event.locationName}</div>
                  <div className="eventpage__subInfo">
                    {event.locationAddress}
                  </div>
                  <div className="eventpage__subInfo">
                    <a
                      href={`https://www.google.com/maps?q=${event.locationName?.replaceAll(" *", "+")}+${event.locationAddress?.replaceAll(" *", "+")}&ll=${event.locationCoordinates?.replaceAll(" *", "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button shape="round">Show me on a map</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="eventpage__spinnerContainer">
            <CustomSpinner text="Loading events" />
          </div>
        )}
        <HelpButtons missingEvent={true} setStartTour={setStartTour} />
      </div>
      <Tour
        open={startTour}
        onClose={() => setStartTour(false)}
        steps={eventPageTourSteps}
      />
    </>
  );
});
