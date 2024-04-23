import React, { useEffect, useState, useRef } from "react";
import { Tour } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { EventPageArtwork } from "./EventPageArtwork/EventPageArtwork";
import { EventPageDesc } from "./EventPageDesc/EventPageDesc";
import { EventPageInValidation } from "./EventPageInValidation/EventPageInValidation";
import { spielplanStore } from "../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { userStore } from "../../../../store/userStore/userStore";
import { getSingleEvents } from "../getSingleEvents";
import { HelpButtons } from "../../../../components/HelpButtons/HelpButtons";
import { CustomSpinner } from "../../../../components/CustomSpinner/CustomSpinnner";
import { getPictureUrl } from "../../../../helpers/picture/getPictureUrl";

import "./EventPage.less";

export const EventPage = observer((props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { event } = props;
  const [startTour, setStartTour] = useState(false);
  const [isNotValidated, setIsNotValidated] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsNotValidated(!eventFound.validated);
    setCanEdit(userStore.isAdmin || userStore._id === eventFound.user._id);
    spielplanStore.setSelectedEvent(eventFound);
  };

  useEffect(() => {
    spielplanStore.fetchTags();
    spielplanStore.fetchEventtypes();
    fetchEventData(params.id);
  }, []);

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
      description: `This are date of when the event will take place. Underneath is the type of event, and the location`,
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

  const getUrlsFromPicturePath = async (pictures) => {
    const urls = await Promise.all(
      pictures.map((picture) => {
        return getPictureUrl(`${picture}`, "events");
      }),
    );
    pageStore.setPicturesUrls(urls);
    setIsLoading(false)
  };

  useEffect(() => {
    if (event?.pictures.length) {
      getUrlsFromPicturePath(event.pictures);
    } else if (event) {
      pageStore.setPicturesUrls(null);
      setIsLoading(false)
    }
  }, [event]);

  return (
    <>
      <div className="eventpage__backgroundgradient"></div>
      {!isNotValidated && (
        <div
          className="eventpage__backgroundimage"
          style={{
            background: `url(${pageStore.picturesUrls && pageStore.picturesUrls[0]}) center center / cover`,
          }}
        ></div>
      )}
      <div
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
      </div>
      {isNotValidated ? (
        <EventPageInValidation />
      ) : (
        <div
          className={`eventpage__container 
                ${pageStore.selectedTheme === "light" ? "black" : "white"}`}
        >
          {!isLoading ? (
            <>
              <EventPageArtwork ref1={ref1} />
              <EventPageDesc
                event={event}
                canEdit={canEdit}
                ref2={ref2}
                ref3={ref3}
                ref4={ref4}
                ref5={ref5}
                ref6={ref6}
              />
            </>
          ) : (
            <div className="eventpage__spinnerContainer">
              <CustomSpinner text="Loading events" />
            </div>
          )}
          <HelpButtons missingEvent={true} setStartTour={setStartTour} />
        </div>
      )}
      <Tour
        open={startTour}
        onClose={() => setStartTour(false)}
        steps={eventPageTourSteps}
      />
    </>
  );
});
