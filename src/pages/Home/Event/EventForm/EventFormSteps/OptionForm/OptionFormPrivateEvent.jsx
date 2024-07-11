import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Radio } from "antd";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { yesNoOptions } from "../../../../../../lib/data/yesNoOptions";
import { pageStore } from "../../../../../../store/pageStore/pageStore";

export const OptionFormPrivateEvent = observer(() => {
  const { t } = useTranslation();

  const isPrivateHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setIsPrivate(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        private: value,
      });
  };

  const forwardableHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setForwardable(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        forwardable: value,
      });
  };

  const isEventtypePrivate = eventFormStore.eventtype === 22;
  const isPrivateEvent = isEventtypePrivate ? true : eventFormStore.isPrivate;

  useEffect(() => {
    if (isEventtypePrivate && eventFormStore.eventId) {
      eventFormStore.setIsPrivate(true);
      updateEvent(eventFormStore.eventId, {
        private: true,
      });
    }
  }, [eventFormStore.eventtype]);

  return (
    <>
      {!isEventtypePrivate && (
        <div className="optionform__element">
          <div className="optionform__title">{t("eventform.isPrivate")}</div>
          <Radio.Group
            options={yesNoOptions[pageStore.selectedLanguage]}
            optionType="button"
            onChange={isPrivateHandler}
            value={isPrivateEvent}
            disabled={isEventtypePrivate}
          />
        </div>
      )}
      {isPrivateEvent && (
        <div className="optionform__element">
          <div className="optionform__title">
            {t("eventform.isForwardable")}
          </div>
          <Radio.Group
            options={yesNoOptions[pageStore.selectedLanguage]}
            optionType="button"
            onChange={forwardableHandler}
            value={eventFormStore.forwardable}
          />
        </div>
      )}
    </>
  );
});
