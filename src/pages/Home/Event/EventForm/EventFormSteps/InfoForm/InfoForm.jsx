import React from "react";
import { observer } from "mobx-react";
import { message, notification } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { addEvent } from "../../../../../Admin/AdminEvents/addEvent";
import { InfoFormDesc } from "./InfoFormDesc";
import { InfoFormEventtype } from "./InfoFormEventtype";
import { InfoFormTitle } from "./InfoFormTitle";
import { InfoFormDateTime } from "./InfoFormDateTime";
import { InfoFormLocation } from "./InfoFormLocation";

import "./InfoForm.less";

export const InfoForm = observer((props) => {
  const { eventtypesOptions } = props;

  const createDraftEvent = async (eventtype, title) => {
    if (eventFormStore.eventId) {
      return;
    }
    const dataObject = {
      eventtype,
      title,
      description: eventFormStore.description,
      location: eventFormStore.locationId,
      locationName: eventFormStore.locationName,
      locationAddress: eventFormStore.locationAddress,
      locationCoordinates: eventFormStore.locationCoordinates,
      pictures: eventFormStore.artworks,
      eventTags: eventFormStore.eventTags,
      lineUp: eventFormStore.lineUp,
      links: eventFormStore.links,
      fromDate: eventFormStore.fromDate?.valueOf(),
      untilDate: eventFormStore.untilDate?.valueOf(),
      hasDresscode: eventFormStore.hasDresscode,
      dresscodeDoTags: eventFormStore.dresscodeDoTags,
      dresscodeDontTags: eventFormStore.dresscodeDontTags,
      ageMin: eventFormStore.ageMin,
      prices: JSON.stringify(eventFormStore.prices),
      equipment: eventFormStore.equipment,
    };

    try {
      const res = await addEvent(dataObject);
      eventFormStore.setEventId(res.id);
      message.success("Draft saved!");
    } catch (e) {
      notification.error({
        message: "Error!",
        description: e.toString(),
        duration: 0,
        placement: "bottomRight",
        className: "customNotification",
      });
    }
  };

  // TODO1: event form, choose partner if any
  return (
    <div
      className={`infoform__container  ${pageStore.selectedTheme === "light"
          ? "lightColorTheme__Text"
          : "darkColorTheme__Text"
        }`}
    >
      <InfoFormEventtype
        eventtypesOptions={eventtypesOptions}
        createDraftEvent={createDraftEvent}
      />
      <InfoFormTitle createDraftEvent={createDraftEvent} />
      <InfoFormDateTime />
      <InfoFormLocation />
      <InfoFormDesc />
    </div>
  );
});
