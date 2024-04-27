import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FloatButton } from "antd";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import {
  CalendarOutlined,
  QuestionOutlined,
  BugOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import { ReportBugModal } from "./ReportBugModal/ReportBugModal";
import { authStore } from "../../store/authStore/authStore";

import "./HelpButtons.less";

export const HelpButtons = observer((props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showReportBugModal, setShowReportBugModal] = useState(false);

  return (
    <>
      <ReportBugModal
        showReportBugModal={showReportBugModal}
        setShowReportBugModal={setShowReportBugModal}
      />
      <FloatButton.Group
        trigger="click"
        tooltip={t("help.helpNeeded")}
        icon={<QuestionOutlined />}
        className="helpbutton"
      >
        <FloatButton
          className={authStore.hasAccess ? "subButton" : "subButtonDisabled"}
          icon={<BugOutlined />}
          tooltip={
            authStore.hasAccess
              ? t("help.reportBug")
              : t("general.needToBeLogin")
          }
          onClick={() => setShowReportBugModal(true)}
          disabled={!authStore.hasAccess}
        />
        {props.missingEvent && (
          <FloatButton
            className={authStore.hasAccess ? "subButton" : "subButtonDisabled"}
            icon={<CalendarOutlined />}
            tooltip={
              authStore.hasAccess
                ? t("help.yourEventIsMissing")
                : t("general.needToBeLogin")
            }
            disabled={!authStore.hasAccess}
            onClick={() => {
              navigate("/event/add");
            }}
          />
        )}
        {props.setStartTour && (
          <FloatButton
            className="subButton"
            icon={<EyeOutlined />}
            tooltip={t("help.showMeAround")}
            onClick={() => {
              props.setStartTour(true);
            }}
          />
        )}
      </FloatButton.Group>
    </>
  );
});
