import React, { useState } from "react";
import { observer } from "mobx-react";
import { Radio } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const InfoFormEventtype = observer((props) => {
  const { createDraftEvent, eventtypesOptions } = props;
  const [showMore, setShowMore] = useState(false);

  const eventtypeHandler = (e) => {
    const value = e.target.value;
    if (value === "more") {
      setShowMore(true);
    } else {
      if (eventFormStore.eventId) {
        updateEvent(eventFormStore.eventId, {
          eventtype: value,
        });
      } else if (value && eventFormStore.title) {
        createDraftEvent(value, eventFormStore.title);
      }
      eventFormStore.setEventtype(value);
      eventFormStore.setEventtypeError(null);
    }
  };

  const eventypesOption = eventtypesOptions?.filter(
    (type) => type.usage !== "admin",
  );

  const eventypesMainOption = eventypesOption?.filter((type) => {
    const hasToBeShown = type.value === eventFormStore.eventtype;
    return type.usage === "main" || hasToBeShown;
  });

  eventypesMainOption &&
    eventypesMainOption.push({ value: "more", label: "..." });

  return (
    <div className="infoform__select">
      <Radio.Group
        options={showMore ? eventypesOption : eventypesMainOption}
        optionType="button"
        onChange={eventtypeHandler}
        value={eventFormStore.eventtype}
      />
      <div className="infoform__error">
        {eventFormStore.eventtypeError && <>{eventFormStore.eventtypeError}</>}
      </div>
    </div>
  );
});
