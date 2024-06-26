import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { EventPage } from "../../../EventPage/EventPage";

import "./PublishForm.less";

export const PublishForm = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    if (
      eventFormStore.artworksError ||
      eventFormStore.eventtypeError ||
      eventFormStore.titleError ||
      eventFormStore.fromDateError ||
      eventFormStore.locationAddressError ||
      eventFormStore.locationNameError ||
      eventFormStore.descriptionError ||
      eventFormStore.dresscodeErrors
    ) {
      eventFormStore.setErrors(true);
    } else {
      eventFormStore.setErrors(false);
    }
  }, []);

  const event = {
    title: eventFormStore.title,
    eventtype: eventFormStore.eventtype,
    description: eventFormStore.description,
    location: eventFormStore.locationId,
    locationName: eventFormStore.locationName,
    locationAddress: eventFormStore.locationAddress,
    locationCoordinates: eventFormStore.locationCoordinates,
    pictures: eventFormStore.artworks,
    eventTags: eventFormStore.eventTags,
    lineUp: eventFormStore.lineUp,
    links: eventFormStore.links,
    fromDate: eventFormStore.fromDate,
    untilDate: eventFormStore.untilDate,
    hasDresscode: eventFormStore.hasDresscode,
    dresscodeDoTags: eventFormStore.dresscodeDoTags,
    dresscodeDontTags: eventFormStore.dresscodeDontTags,
    ageMin: eventFormStore.ageMin,
    prices: eventFormStore.prices,
    equipment: eventFormStore.equipment,
  };

  return (
    <>
      <div
        className={`publishform__container  ${
          pageStore.selectedTheme === "light"
            ? "lightColorTheme__Text"
            : "darkColorTheme__Text"
        }`}
      >
        {eventFormStore.errors && (
          <>
            {eventFormStore.artworksError && (
              <div className="publishform__error">
                {eventFormStore.artworksError}
              </div>
            )}
            {eventFormStore.eventtypeError && (
              <div className="publishform__error">
                {eventFormStore.eventtypeError}
              </div>
            )}
            {eventFormStore.titleError && (
              <div className="publishform__error">
                {eventFormStore.titleError}
              </div>
            )}
            {eventFormStore.fromDateError && (
              <div className="publishform__error">
                {eventFormStore.fromDateError}
              </div>
            )}
            {eventFormStore.locationAddressError && (
              <div className="publishform__error">
                {eventFormStore.locationAddressError}
              </div>
            )}
            {eventFormStore.locationNameError && (
              <div className="publishform__error">
                {eventFormStore.locationNameError}
              </div>
            )}
            {eventFormStore.descriptionError && (
              <div className="publishform__error">
                {eventFormStore.descriptionError}
              </div>
            )}
            {eventFormStore.dresscodeErrors && (
              <div className="publishform__error">
                {eventFormStore.dresscodeErrors}
              </div>
            )}
          </>
        )}

        {!eventFormStore.locationName && (
          <div className="publishform__info">
            {t("eventform.missingLocation")}
          </div>
        )}
        {!eventFormStore.description && (
          <div className="publishform__info">{t("eventform.missingDesc")}</div>
        )}
      </div>

      {!eventFormStore.errors && (
        <>
          <EventPage event={event} />
          <div className="pubishform__spacer"></div>
        </>
      )}
    </>
  );
});
