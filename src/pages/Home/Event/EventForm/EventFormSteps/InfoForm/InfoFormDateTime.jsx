import React from "react";
import { observer } from "mobx-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import { eventFormStore } from "../../eventFormStore";
import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";

export const InfoFormDateTime = observer(() => {
  const { RangePicker } = DatePicker;

  const disabledDate = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, "days")) >= 7;
    }
    return false;
  };

  const dateHandler = (dates) => {
    if (dates[0].valueOf() >= dates[1].valueOf()) {
      eventFormStore.setFromDateError(
        "The event can not end before it has started!",
      );
    } else if (dates[0] < dayjs()) {
      eventFormStore.setFromDateError("An event can not start in the past!");
    } else {
      eventFormStore.setFromDateError(null);
    }
    eventFormStore.setFromDate(dates[0]);
    eventFormStore.setUntilDate(dates[1]);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        fromDate: dates[0].valueOf(),
        untilDate: dates[1].valueOf(),
      });
  };

  return (
    <>
      <div className="infoform__element">
        <div className="infoform__title">Date & Time</div>
        <RangePicker
          allowEmpty={[false, false]}
          showTime={{ format: "HH:mm" }}
          format="DD-MM-YY HH:mm"
          style={{ width: "100%" }}
          needConfirm={false}
          placeholder={["Event start-date", "Event end-date"]}
          onChange={dateHandler}
          disabledDate={disabledDate}
          onFocus={() => eventFormStore.setDeactivateNav(true)}
          onBlur={() => eventFormStore.setDeactivateNav(false)}
          value={[eventFormStore.fromDate, eventFormStore.untilDate]}
        />
        <div className="infoform__error">
          {eventFormStore.fromDateError && <>{eventFormStore.fromDateError}</>}
        </div>
      </div>
    </>
  );
});
