import React, { useState } from "react";
import { Button, notification } from "antd";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { authStore } from "../../../../store/authStore/authStore.js";
import { archiveAccount } from "./archiveAccount.js";

import "./DeleteAccountButton.less";

export const DeleteAccountButton = () => {
  const { t } = useTranslation();
  const [showAreYouSureButton, setShowAreYouSureButton] = useState(false);
  const [secondsBeforeDisapearing, setSecondsBeforeDisapearing] = useState(0);

  const areYouSureHandler = () => {
    setShowAreYouSureButton(true);
    setSecondsBeforeDisapearing(5);
    setTimeout(() => {
      setSecondsBeforeDisapearing(4);
    }, 1000);
    setTimeout(() => {
      setSecondsBeforeDisapearing(3);
    }, 2000);
    setTimeout(() => {
      setSecondsBeforeDisapearing(2);
    }, 3000);
    setTimeout(() => {
      setSecondsBeforeDisapearing(1);
    }, 4000);
    setTimeout(() => {
      setShowAreYouSureButton(false);
    }, 5000);
  };

  const deleteAccountHandler = (event) => {
    archiveAccount(true);
    notification.error({
      message: (
        <>
          <b> {t("settings.willBeArchived")} </b>{" "}
          {t("settings.loggingToReactivate")}
        </>
      ),
      placement: "bottomRight",
    });
    authStore.logout();
  };

  return (
    <div className="EditSettings__singleSetting">
      <div className="EditSettings__title {">{t("settings.deleteAccount")}</div>
      <Button
        block
        className="deleteButton"
        icon={<DeleteOutlined />}
        onClick={areYouSureHandler}
        type="primary"
        disabled={showAreYouSureButton}
      >
        {t("settings.deleteAccount")}
      </Button>
      {showAreYouSureButton && (
        <>
          <div className="deleteButtonSpacer"></div>
          <Button
            block
            className="deleteButton"
            icon={<WarningOutlined />}
            onClick={deleteAccountHandler}
            type="primary"
          >
            {t("general.areYouSure")} ... {secondsBeforeDisapearing}
          </Button>
        </>
      )}
    </div>
  );
};
