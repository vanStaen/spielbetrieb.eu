import React from "react";
import { observer } from "mobx-react";
import { Input } from "antd";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const InfoFormTitle = observer((props) => {
  const { createDraftEvent } = props;

  const titleHander = (e) => {
    const value = e.target.value;
    eventFormStore.setTitle(value);
    if (value.length === 0) {
      eventFormStore.setTitleError("You need a title for your event!");
    } else if (value.length < 4) {
      eventFormStore.setTitleError("This title looks a bit short!");
    } else {
      eventFormStore.setTitleError(null);
    }
    if (!eventFormStore.eventtype) {
      eventFormStore.setEventtypeError("Please select an event type!");
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
        <div className="infoform__title">Title</div>
        <Input
          placeholder="Name of the event"
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
