import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Segmented } from "antd";
import { useTranslation } from "react-i18next";
import {
  UserOutlined,
  SettingOutlined,
  WarningOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { userStore } from "../../../store/userStore/userStore";
import { authStore } from "../../../store/authStore/authStore";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";
import { isMobileCheck } from "../../../helpers/dev/checkMobileTablet";

import { DangerZone } from "./DangerZone";
import { EmailSettings } from "./EmailSettings";
import { ProfileSettings } from "./ProfileSettings";
import { AccountSettings } from "./AccountSettings";

import "./Settings.less";

export const Settings = observer(() => {
  const { t } = useTranslation();
  const [pageSelected, setPageSelected] = useState(1);

  const isMobile = isMobileCheck();

  const redirectIfNotLoggedIn = async () => {
    if (!authStore.hasAccess) {
      const hasAccess = await authStore.checkAccess();
      if (!hasAccess) {
        location.href = "../";
      }
    }
  };

  useEffect(() => {
    redirectIfNotLoggedIn();
    userStore.fetchUserData();
  }, []);

  const settingsOption = [
    {
      value: 1,
      label: !isMobile && t("settings.accountSettings"),
      icon: <UserOutlined />,
    },
    {
      value: 2,
      label: !isMobile && t("settings.profileSettings"),
      icon: <SettingOutlined />,
    },
    {
      value: 3,
      label: !isMobile && t("settings.emailSettings"),
      icon: <MailOutlined />,
    },
    {
      value: 4,
      label: !isMobile && t("settings.dangerZone"),
      icon: <WarningOutlined />,
    },
  ];

  const segmentedChangeHandler = (e) => {
    setPageSelected(e);
  };

  const renderSwitch = (settingPage) => {
    switch (settingPage) {
      case 1:
        return <AccountSettings />;
      case 2:
        return <ProfileSettings />;
      case 3:
        return <EmailSettings />;
      case 4:
        return <DangerZone />;
      default:
        return "Error";
    }
  };

  return (
    <div className="EditSettings__main">
      {userStore.isLoading ? (
        <div className="EditSettings__loader">
          <CustomSpinner
            text={`${t("general.loading")} (${t("settings.settings")})`}
          />
        </div>
      ) : (
        <>
          <div className="EditSettings__segmentedContainer">
            <Segmented
              size={isMobile && "large"}
              className="EditSettings__segmented"
              onChange={segmentedChangeHandler}
              options={settingsOption}
            />
          </div>
          <div className="EditSettings__spacerDiv" />
          {renderSwitch(pageSelected)}
        </>
      )}
      <HelpButtons />
    </div>
  );
});
