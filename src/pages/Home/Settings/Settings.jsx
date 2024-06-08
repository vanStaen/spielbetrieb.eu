import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Segmented } from "antd";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { authStore } from "../../../store/authStore/authStore";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";

import { DangerZone } from "./DangerZone";
import { EmailSettings } from "./EmailSettings";
import { ProfileSettings } from "./ProfileSettings";
import { AccountSettings } from "./AccountSettings";

import "./Settings.less";

export const Settings = observer(() => {
  const { t } = useTranslation();
  const [pageSelected, setPageSelected] = useState(1);

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
    userStore.isLoading && userStore.fetchUserData();
  }, []);

  const settingsOption = [
    { value: 1, label: t("settings.accountSettings"), },
    { value: 2, label: t("settings.profileSettings"), },
    { value: 3, label: t("settings.emailSettings"), },
    { value: 4, label: t("settings.dangerZone"), },
  ]

  const segmentedChangeHandler = (e) => {
    console.log(e);
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
          <Segmented
            className="EditSettings__segmented"
            onChange={segmentedChangeHandler}
            options={settingsOption}
          />
          <div className="EditSettings__spacerDiv" />
          {renderSwitch(pageSelected)}
        </>
      )}
      <HelpButtons />
    </div>
  );
});
