import React from "react";
import { observer } from "mobx-react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const InfoFormTitle = observer((props) => {
  const { createDraftEvent } = props;
  const { t } = useTranslation();

  const titleHander = (e) => {
    const value = e.target.value;
    eventFormStore.setTitle(value);
    if (value.length === 0) {
      eventFormStore.setTitleError(t("eventform.errorEventTitle"));
    } else if (value.length < 4) {
      eventFormStore.setTitleError(t("eventform.errorEventTitleShort"));
    } else {
      eventFormStore.setTitleError(null);
    }
    if (!eventFormStore.eventtype) {
      eventFormStore.setEventtypeError(t("eventform.errorEventType"));
    }
  };

  const titleBlurHandler = () => {
    eventFormStore.setDeactivateNav(false);
    if (eventFormStore.eventId) {
      updateEvent(eventFormStore.eventId, {
        title: eventFormStore.title,
      });
    } else if (eventFormStore.eventtype && eventFormStore.title) {
      createDraftEvent(eventFormStore.eventtype, eventFormStore.title);
    }
  };

  return (
    <>
      <div className="infoform__element">
        <div className="infoform__title">{t("eventform.title")}</div>
        <Input
          placeholder={t("eventform.nameOfEvent")}
          onChange={titleHander}
          onBlur={titleBlurHandler}
          onFocus={() => eventFormStore.setDeactivateNav(true)}
          value={eventFormStore.title}
        />
        <div className="infoform__error">
          {eventFormStore.titleError && <>{eventFormStore.titleError}</>}
        </div>
      </div>
    </>
  );
});
