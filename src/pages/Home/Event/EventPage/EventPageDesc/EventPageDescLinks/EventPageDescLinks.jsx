import React from "react";
import { observer } from "mobx-react";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./EventPageDescLinks.less";

export const EventPageDescLinks = observer((props) => {
  const { event, canEdit } = props;
  const { t } = useTranslation();

  return (
    <div className="eventpage__linkContainer">
      <div className="eventpage__linkTitle">
        {t("event.links")}{" "}
        {canEdit && <EditOutlined className="editOutlined" />}
      </div>
      <div className="eventpage__link">
        {event.links.map((link, index) => {
          let linkUrl = link;
          if (!link.includes("http")) {
            linkUrl = `http://${linkUrl}`;
          }
          return (
            <a
              href={linkUrl}
              key={`linkKey${index}`}
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          );
        })}
      </div>
    </div>
  );
});
