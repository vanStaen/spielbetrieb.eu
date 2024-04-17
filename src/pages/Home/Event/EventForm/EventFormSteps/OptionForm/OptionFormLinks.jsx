import React from "react";
import { observer } from "mobx-react";
import { Select } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const OptionFormLinks = observer(() => {
  const linksHandler = (value) => {
    eventFormStore.setLinks(value);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        links: value,
      });
  };

  return (
    <div className="optionform__element">
      <div className="optionform__title">Links</div>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Add links to your event"
        onChange={linksHandler}
        value={eventFormStore.links}
        onFocus={() => eventFormStore.setDeactivateNav(true)}
        onBlur={() => eventFormStore.setDeactivateNav(false)}
      />
    </div>
  );
});
