import React from "react";
import { Typography } from "antd";
import { observer } from "mobx-react";
import {
  EnvironmentOutlined,
  TagOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { pageStore } from "../../../../../store/pageStore/pageStore";
import { nameParser } from "../../../../../helpers/dev/nameParser";
import { spielplanStore } from "../../../../../store/spielplanStore/spielplanStore";
import { EventPageDescInfos } from "./EventPageDescInfos/EventPageDescInfos";
import { EventPageDescLineUp } from "./EventPageDescLineUp/EventPageDescLineUp";
import { EventPageDescEquipment } from "./EventPageDescEquipment/EventPageDescEquipment";
import { EventPageDescLocations } from "./EventPageDescLocations/EventPageDescLocations";

import "./EventPageDesc.less";

export const EventPageDesc = observer((props) => {
  const { Paragraph } = Typography;
  const { ref2, ref3, ref4, ref5, ref6, event } = props;

  // console.log(event);

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

      {event.description && (
        <div className="eventpage__descContainer">
          <div className="eventpage__descTitle">
            Event description <EditOutlined className="editOutlined" />
          </div>
          <div className="eventpage__desc" ref={ref6}>
            <Paragraph
              className="eventpage__desc"
              ellipsis={{ rows: 7, expandable: true, symbol: "more" }}
            >
              {event.description}
            </Paragraph>
          </div>
        </div>
      )}

      <EventPageDescInfos event={event} eventTypeName={eventTypeName} />
      <EventPageDescLocations event={event} />
      {!!event.lineUp?.length && <EventPageDescLineUp event={event} />}
      {!!event.equipment?.length > 0 && (
        <EventPageDescEquipment event={event} />
      )}
    </div>
  );
});
