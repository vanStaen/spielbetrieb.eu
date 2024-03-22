import React from "react";
import { useTranslation } from "react-i18next";
import { FloatButton } from "antd";
import { observer } from "mobx-react";
import {
  CalendarOutlined,
  QuestionOutlined,
  BugOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import "./HelpButtons.less";

export const HelpButtons = observer((props) => {
  const { t } = useTranslation();

  return (
    <>
      <FloatButton.Group
        trigger="click"
        tooltip={t("help.helpNeeded")}
        icon={<QuestionOutlined />}
        className="helpbutton"
      >
        <FloatButton
          className="subButton"
          icon={<BugOutlined />}
          tooltip={t("help.reportBug")}
        />
        {props.page === "spielplan" && (
          <FloatButton
            className="subButton"
            icon={<CalendarOutlined />}
            tooltip={t("help.yourEventIsMissing")}
          />
        )}
        {props.page === "spielplan" && (
          <FloatButton
            className="subButton"
            icon={<EyeOutlined />}
            tooltip={t("help.showMeAround")}
            onClick={() => { props.setStartTour(true) }}
          />
        )}
      </FloatButton.Group>
    </>
  );
});
