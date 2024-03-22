import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Tour } from "antd";

import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinnner";
import { EventCard } from "./EventCard/EventCard";
import { nameParser } from "../../../helpers/nameParser";
import { spielplanStore } from "../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../store/pageStore/pageStore";
import { EventFilters } from "./EventFilters/EventFilters";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";

import "./Spielplan.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

export const Spielplan = observer(() => {
  const { t } = useTranslation();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const throttling = useRef(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [startTour, setStartTour] = useState(false);

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (throttling.current === false) {
      throttling.current = true;
      if (isRightSwipe) {
        spielplanStore.calculateFilterDateFrom(false);
      } else if (isLeftSwipe) {
        spielplanStore.calculateFilterDateFrom(true);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    spielplanStore.fetchEventtypes();
    spielplanStore.fetchLocations();
    spielplanStore.fetchTags();
    spielplanStore.fetchEvents();
  }, []);

  useEffect(() => {
    if (
      spielplanStore.eventtypes.length > 0 &&
      spielplanStore.locations.length > 0 &&
      spielplanStore.tags.length > 0
    ) {
      spielplanStore.setIsLoadingData(false);
    }
  }, [spielplanStore.eventtypes, spielplanStore.locations, spielplanStore.tags]);

  const eventsFormatted = spielplanStore.events?.map((event, index) => {
    const eventColor = spielplanStore.eventtypes?.filter(
      (et) => parseInt(et._id) === event.eventtype,
    )[0]?.color;
    const eventTags = event.eventTags.map((tagId) => {
      return {
        name: nameParser(
          spielplanStore.tags.filter((tag) => parseInt(tag._id) === tagId)[0]
            ?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        ),
        id: tagId,
      };
    });
    const eventType = spielplanStore.eventtypes.filter(
      (et) => parseInt(et._id) === event.eventtype,
    )[0];
    eventTags.splice(0, 0, {
      name: nameParser(
        eventType?.name,
        pageStore.selectedLanguage?.toLowerCase(),
      ),
      id: eventType?._id,
    });

    if (spielplanStore.filterLocations.length) {
      if (!spielplanStore.filterLocations.includes(String(event.location))) {
        return null;
      }
    }

    if (spielplanStore.filterEventtypes.length) {
      if (!spielplanStore.filterEventtypes.includes(String(event.eventtype))) {
        return null;
      }
    }

    if (spielplanStore.filterTags.length) {
      if (
        !spielplanStore.filterTags.some((tag) =>
          event.eventTags.includes(parseInt(tag)),
        )
      ) {
        return null;
      }
    }

    return (
      index === 0 ?
      <div ref={ref3}>
        <EventCard
          key={`eventCard${event._id}`}
          event={event}
          color={eventColor}
          tags={eventTags}
        />
      </div>
      :
      <EventCard
        key={`eventCard${event._id}`}
        event={event}
        color={eventColor}
        tags={eventTags}
      />
    );
  });

  const eventsFormattedAndCleaned = eventsFormatted.filter((events) => events);

  const spielplanTourSteps = [
    {
      title: 'Filter result per time span',
      description: 'You probably wants to see events for a specifc time frame: use this feature to filter the results per month, weeks or day.',
      target: () => ref1.current,
    },
    {
      title: 'Location, events and tags',
      description: <>Use this to filter the results based on Locations, Event types or Tags. Those filter are not additive. Thus if you pick the location <i>KitKatClub</i> and the tag <i>Flinta</i>, you will see all events happening at Kitkat <b>OR</b> the events maked with the tag flinta.</>,
      target: () => ref2.current,
    },
    {
      title: 'All events matching your filter',
      description: <>All events matching your filter (if any) will be displayed here. If you don't see anything, you may want to reset some filter and maybe increase the time frame.</>,
      target: () => ref3.current,
    }
  ];

  return (
    <>
      {spielplanStore.isLoadingData ? (
        <div className="spielplan__spinnerContainer">
          <CustomSpinner text="Loading events" />
        </div>
      ) : (
        <div
          className="spielplan__container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={() => onTouchEnd()}
        >
          <HelpButtons page={"spielplan"} setStartTour={setStartTour} />
          <EventFilters ref1={ref1} ref2={ref2} />
          {spielplanStore.isLoadingEvent ? (
            <div className="spielplan__noEventContainer" ref={ref3}>
              <CustomSpinner text="Loading events" />
            </div>
          ) : eventsFormattedAndCleaned.length === 0 ? (
            <div className="spielplan__noEventContainer">
              <div
                className={`spielplan__noEventText ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
              >
                <div>{t("spielplan.noEventsFound")}</div>
                <div className="spielplan__noEventSubText">
                  {t("spielplan.tryOtherFilter")}
                </div>
              </div>
            </div>
          ) : (
            eventsFormattedAndCleaned
          )}
        </div>
      )}
      <Tour open={startTour} onClose={() => setStartTour(false)} steps={spielplanTourSteps} />

    </>
  );
});
