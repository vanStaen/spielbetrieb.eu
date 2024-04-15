import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { EventPage } from "../../../EventPage/EventPage";

import "./PublishForm.less";

export const PublishForm = observer(() => {
  useEffect(() => {
    if (
      eventFormStore.artworksError ||
      eventFormStore.eventtypeError ||
      eventFormStore.titleError ||
      eventFormStore.fromDateError ||
      eventFormStore.locationAddressError ||
      eventFormStore.locationNameError ||
      eventFormStore.descriptionError
    ) {
      eventFormStore.setErrors(true);
    } else {
      eventFormStore.setErrors(false);
    }
  }, []);

  const onFinish = async () => {
    // TODO: Add new location to be validated

    setLoading(true);
    const dataObject = await form.validateFields();
    dataObject.private = dataObject.isPrivate;
    dataObject.fromDate = dataObject.eventDate[0].valueOf();
    dataObject.untilDate = dataObject.eventDate[1].valueOf();
    if (dataObject.location) {
      const selectedLocation = locations.filter(
        (loc) => parseInt(loc._id) === dataObject.location,
      )[0];
      dataObject.locationName = selectedLocation.name;
      dataObject.locationAddress = selectedLocation.address;
      dataObject.locationCoordinates = selectedLocation.coordinates;
    }
    delete dataObject.isPrivate;
    delete dataObject.eventDate;
    try {
      if (isEdit) {
        await updateEvent(isEdit, dataObject);
      } else {
        await addEvent(dataObject);
      }
    } catch (e) {
      notification.error({
        message: `Error: ${e.toString()}`,
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    }
    setLoading(false);
    setShowEventForm(false);
    reload();
  };

  const event = {
    attendess: null,
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
        className={`publishform__container  ${pageStore.selectedTheme === "light"
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
          </>
        )}

        {!eventFormStore.locationName && (
          <div className="publishform__info">
            The event location will be shown as <i>'To be announced'</i>
          </div>
        )}
        {!eventFormStore.description && (
          <div className="publishform__info">
            The event location does not have a description
          </div>
        )}
      </div>

      {eventFormStore.errors && <div className="pubishform__spacer"></div>}
      {!eventFormStore.errors && <EventPage event={event} />}
    </>
  );
});
