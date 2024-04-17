import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  Input,
  DatePicker,
  Row,
  Col,
  AutoComplete,
  message,
  notification,
} from "antd";

import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { GoogleMap } from "./GoogleMap";
import { addEvent } from "../../../../../Admin/AdminEvents/addEvent";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { spielplanStore } from "../../../../../../store/spielplanStore/spielplanStore";
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
    };
    try {
      const res = await addEvent(dataObject);
      eventFormStore.setEventId(res._id);
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

  return (
    <div
      className={`infoform__container  ${
        pageStore.selectedTheme === "light"
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
