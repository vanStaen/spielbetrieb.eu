import React from "react";
import { observer } from "mobx-react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const OptionFormEquipements = observer((props) => {
  const { equipmentsOptions } = props;
  const { t } = useTranslation();

  const equipmentHandler = (value) => {
    eventFormStore.setEquipment(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        equipment: value,
      });
  };

  return (
    <div className="optionform__element">
      <div className="optionform__title">{t('eventform.playEquipment')}</div>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder={t('eventform.equipmentDesc')}
        options={equipmentsOptions}
        onChange={equipmentHandler}
        value={eventFormStore.equipment}
        onFocus={() => eventFormStore.setDeactivateNav(true)}
        onBlur={() => eventFormStore.setDeactivateNav(false)}
        filterOption={(inputValue, option) =>
          option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    </div>
  );
});
