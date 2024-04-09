import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { eventFormStore } from "../../eventFormStore";

import "./PublishForm.less";

export const PublishForm = observer(() => {
  const [errors, setErrors] = useState(false);

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
      setErrors(true);
    }
  }, []);
  const onFinish = async () => {
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

  return (
    <div className="publishform__container">
      {errors ? (
        <>
          {eventFormStore.artworksError && "Artworks are mising"}
          {eventFormStore.eventtypeError && "Event type is mising"}
          {eventFormStore.titleError && "You need to name your event"}
          {eventFormStore.fromDateError &&
            "There is an error with the event dates"}
          {eventFormStore.locationAddressError &&
            "There is an error with the location address"}
          {eventFormStore.locationNameError &&
            "There is an error with the location name"}
          {eventFormStore.descriptionError &&
            "There is an error with the event description"}
        </>
      ) : (
        <>Publish</>
      )}
    </div>
  );
});
