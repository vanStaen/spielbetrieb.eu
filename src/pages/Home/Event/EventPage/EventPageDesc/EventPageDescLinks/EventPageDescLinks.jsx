import React from "react";
import { observer } from "mobx-react";
import { EditOutlined } from "@ant-design/icons";

import "./EventPageDescLinks.less";

export const EventPageDescLinks = observer((props) => {
  const { event } = props;

  return (
    <div className="eventpage__linkContainer">
      <div className="eventpage__linkTitle">
        Links <EditOutlined className="editOutlined" />
      </div>
      <div className="eventpage__link">
        {event.links.map(link => {
          let linkUrl = link;
          if (!link.includes('http')) {
            linkUrl = `http://${linkUrl}`;
          }
          return <a href={linkUrl} className='link' target='_blank'>{link}</a>
        })}
      </div>
    </div>
  );
});
