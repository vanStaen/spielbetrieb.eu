import React from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

import "./EventPageDescLocation.less";

export const EventPageDescLocation = observer((props) => {
  const { event } = props;

  return (
    <div className="eventpage__locationContainer">
      <div className="eventpage__locationTitle">
        Location <EditOutlined className="editOutlined" />
      </div>
      {event.locationName && event.locationAddress ? (
        <div className="eventpage__location">
          <div className="eventpage__subInfo">{event.locationName}</div>
          <div className="eventpage__subInfo">{event.locationAddress}</div>
          <div className="eventpage__subInfo">
            <a
              href={`https://www.google.com/maps?q=${event.locationName?.replaceAll(" *", "+")}+${event.locationAddress?.replaceAll(" *", "+")}&ll=${event.locationCoordinates?.replaceAll(" *", "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button shape="round">Show me on a map</Button>
            </a>
          </div>
        </div>
      ) : (
        <div className="eventpage__location">
          <div className="eventpage__subInfo">To be announced</div>
        </div>
      )}
    </div>
  );
});
