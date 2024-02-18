import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinnner";
import { EventCard } from "./EventCard/EventCard";
import { nameParser } from "../../../helpers/nameParser";
import { agendaStore } from "../../../store/agendaStore/agendaStore";
import { pageStore } from "../../../store/pageStore/pageStore";
import { EventFilters } from "./EventFilters/EventFilters";

import "./Agenda.less";

export const Agenda = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    agendaStore.fetchEventtypes();
    agendaStore.fetchLocations();
    agendaStore.fetchTags();
    agendaStore.fetchEvents();
  }, []);

  useEffect(() => {
    if (
      agendaStore.eventtypes.length > 0 &&
      agendaStore.locations.length > 0 &&
      agendaStore.tags.length > 0
    ) {
      agendaStore.setIsLoadingData(false);
    }
  }, [agendaStore.eventtypes, agendaStore.locations, agendaStore.tags]);

  const eventsFormatted = agendaStore.events?.map((event) => {
    const eventColor = agendaStore.eventtypes.filter(
      (et) => parseInt(et._id) === event.eventtype,
    )[0]?.color;
    const eventTags = event.eventTags.map((tagId) => {
      return nameParser(
        agendaStore.tags.filter((tag) => parseInt(tag._id) === tagId)[0]?.name,
        pageStore.selectedLanguage?.toLowerCase(),
      );
    });
    eventTags.splice(
      0,
      0,
      nameParser(
        agendaStore.eventtypes.filter(
          (et) => parseInt(et._id) === event.eventtype,
        )[0]?.name,
        pageStore.selectedLanguage?.toLowerCase(),
      ),
    );
    return (
      <EventCard
        key={`eventCard${event._id}`}
        event={event}
        color={eventColor}
        tags={eventTags}
      />
    );
  });

  return (
    <>
      {agendaStore.isLoadingData ? (
        <div className="agenda__spinnerContainer">
          <CustomSpinner text="Loading events" />
        </div>
      ) : (
        <div className="agenda__container">
          <EventFilters />
          {agendaStore.isLoadingEvent ? (
            <div className="agenda__noEventContainer">
              <CustomSpinner text="Loading events" />
            </div>
          ) : eventsFormatted.length === 0 ? (
            <div className="agenda__noEventContainer">
              <div
                className={`agenda__noEventText ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
              >
                <div>{t("agenda.noEventsFound")}</div>
                <div className="agenda__noEventSubText">
                  {t("agenda.tryOtherFilter")}
                </div>
              </div>
            </div>
          ) : (
            eventsFormatted
          )}
        </div>
      )}
    </>
  );
});
