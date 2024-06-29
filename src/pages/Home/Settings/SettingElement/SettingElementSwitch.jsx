import React from "react";
import { Switch } from "antd";
import { CloseOutlined, CheckOutlined, EnterOutlined } from "@ant-design/icons";

import { updateSettings } from "./updateSettings";
import { userStore } from "../../../../store/userStore/userStore";

import "./SettingElement.less";

export const SettingElementSwitch = (props) => {
  const { title, value, setting, type, dependOnPrevious } = props;

  const changeSettingsHandler = () => {
    const tempSettings = userStore[type];
    tempSettings[setting] = !value;
    if (type === "emailSettings") {
      userStore.setEmailSettings(tempSettings);
      updateSettings(tempSettings, userStore.profilSettings);
    } else if (type === "profilSettings") {
      userStore.setProfilSettings(tempSettings);
      updateSettings(userStore.emailSettings, tempSettings);
    }
  };

  return (
    <div className="settingElement__container">
      <div
        className={
          dependOnPrevious
            ? "settingElement__switchContainerDepend"
            : "settingElement__switchContainer"
        }
      >
        {dependOnPrevious && (
          <EnterOutlined className="settingsElement__dependLogo" />
        )}
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={() => {
            changeSettingsHandler();
          }}
          checked={value}
        />
      </div>
      <div
        className={`${
          dependOnPrevious
            ? "settingElement__titleContainerDepend"
            : "settingElement__titleContainer"
        }`}
      >
        {title}
      </div>
    </div>
  );
};
