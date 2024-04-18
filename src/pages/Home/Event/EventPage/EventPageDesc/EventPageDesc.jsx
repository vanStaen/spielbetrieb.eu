import React from "react";
import { observer } from "mobx-react";
import { EnvironmentOutlined, TagOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { pageStore } from "../../../../../store/pageStore/pageStore";
import { nameParser } from "../../../../../helpers/dev/nameParser";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";
import { EventPageDescInfos } from "./EventPageDescInfos/EventPageDescInfos";
import { EventPageDescLineUp } from "./EventPageDescLineUp/EventPageDescLineUp";
import { EventPageDescEquipment } from "./EventPageDescEquipment/EventPageDescEquipment";
import { EventPageDescLocation } from "./EventPageDescLocation/EventPageDescLocation";
import { EventPageDescLinks } from "./EventPageDescLinks/EventPageDescLinks";

import "./EventPageDesc.less";
import { EventPageDescription } from "./EventPageDescription/EventPageDescription";

export const EventPageDesc = observer((props) => {
  const { ref2, ref3, ref4, ref5, ref6, event } = props;

  const eventTypeName = nameParser(
    spielplanStore.eventtypes.filter(
      (eventtype) => parseInt(eventtype._id) === event?.eventtype,
    )[0]?.name,
    pageStore.selectedLanguage?.toLowerCase(),
  );

  return (
    <div className="eventpage__descCol">
      <div className="eventpage__title" ref={ref2}>
        {event.title}
      </div>
      <div ref={ref3}>
        <div className="eventpage__date">
          <span className="eventpage__weekday">
            {dayjs(event.fromDate).format("dddd")}
          </span>{" "}
          <span className="eventpage__daymonth">
            {dayjs(event.fromDate).format("DD MMMM")}
          </span>{" "}
          <span className="eventpage__year">
            {dayjs(event.fromDate).format("YYYY")}
          </span>
        </div>
        <div className="eventpage__typeLocation">
          <span className="eventpage__typeLocationSpan">
            <TagOutlined className="eventpage__typeLocationIcon" />{" "}
            {eventTypeName}
          </span>
          {event.locationName && event.locationAddress && (
            <span className="eventpage__typeLocationSpan">
              <EnvironmentOutlined className="eventpage__typeLocationIcon" />{" "}
              {event.locationName}
            </span>
          )}
        </div>
      </div>

      {!!event.description && <EventPageDescription event={event} />}
      <EventPageDescInfos event={event} eventTypeName={eventTypeName} />
      <EventPageDescLocation event={event} />
      {!!event.links?.length && <EventPageDescLinks event={event} />}
      {!!event.lineUp?.length && <EventPageDescLineUp event={event} />}
      {!!event.equipment?.length > 0 && (
        <EventPageDescEquipment event={event} />
      )}
    </div>
  );
});
