import React from "react";
import { observer } from "mobx-react";
import { Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./EventPageDescription.less";

export const EventPageDescription = observer((props) => {
  const { event, canEdit } = props;
  const { Paragraph } = Typography;
  const { t } = useTranslation();

  return (
    <div className="eventpage__descContainer">
      <div className="eventpage__descTitle">
        {t("event.eventDesc")}{" "}
        {canEdit && <EditOutlined className="editOutlined" />}
      </div>
      <div className="eventpage__desc">
        <Paragraph
          className="eventpage__desc"
          ellipsis={{ rows: 7, expandable: true, symbol: "more" }}
        >
          {event.description}
        </Paragraph>
      </div>
    </div>
  );
});
