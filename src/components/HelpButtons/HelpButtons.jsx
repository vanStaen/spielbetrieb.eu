import React from "react";
import { useTranslation } from "react-i18next";
import { FloatButton } from "antd";
import { observer } from "mobx-react";
import {
  CalendarOutlined,
  QuestionOutlined,
  BugOutlined,
} from "@ant-design/icons";

import "./HelpButtons.less";

export const HelpButtons = observer((props) => {
  const { t } = useTranslation();

  return (
    <FloatButton.Group
      trigger="click"
      tooltip={t("help.helpNeeded")}
      icon={<QuestionOutlined />}
      className="helpbutton"
    >
      <FloatButton
        className="missingEventButton"
        icon={<BugOutlined />}
        tooltip={t("help.reportBug")}
      />
      {props.page === "spielplan" && (
        <FloatButton
          className="missingEventButton"
          icon={<CalendarOutlined />}
          tooltip={t("help.yourEventIsMissing")}
        />
      )}
    </FloatButton.Group>
  );
});
