import React from "react";
import { observer } from "mobx-react";
import { Radio } from "antd";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { ageOptions } from "../../../../../../lib/data/ageOptions";

export const OptionFormAgeMin = observer(() => {
  const { t } = useTranslation();

  const ageMinHandler = (e) => {
    const value = e.target.value;
    eventFormStore.setAgeMin(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        ageMin: value,
      });
  };

  return (
    <div className="optionform__element">
      <div className="optionform__title">{t('eventform.guestMinAge')}</div>
      <Radio.Group
        options={ageOptions}
        optionType="button"
        onChange={ageMinHandler}
        value={eventFormStore.ageMin}
      />
    </div>
  );
});
