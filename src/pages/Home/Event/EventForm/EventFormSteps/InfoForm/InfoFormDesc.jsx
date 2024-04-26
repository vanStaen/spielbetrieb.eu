import React from "react";
import { observer } from "mobx-react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const InfoFormDesc = observer(() => {
  const { TextArea } = Input;
  const { t } = useTranslation();

  const descHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setDescription(value);
  };

  const descBlurHandler = () => {
    eventFormStore.setDeactivateNav(false);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        description: eventFormStore.description,
      });
  };

  return (
    <div className="infoform__element">
      <div className="infoform__title">{t('eventform.description')}</div>
      <TextArea
        placeholder={"Description of the event"}
        value={eventFormStore.description}
        rows={8}
        onChange={descHandler}
        onBlur={descBlurHandler}
        onFocus={() => eventFormStore.setDeactivateNav(true)}
      />
    </div>
  );
});
