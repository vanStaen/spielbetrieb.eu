import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Divider } from "antd";

import { userStore } from "../../../store/userStore/userStore";
import { SettingElementSwitch } from "./SettingElement/SettingElementSwitch";

export const ProfileSettings = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="EditSettings__container">

      <Divider plain className="EditSettings__divider">
        Anonymosity
      </Divider>

      <SettingElementSwitch
        title={t("settings.settingShowLastOnline")}
        type={"profilSettings"}
        setting={"showLastSeenOnline"}
        value={userStore.profilSettings.showLastSeenOnline}
      />

      <SettingElementSwitch
        title={t("settings.hideProfilToStrangers")}
        type={"profilSettings"}
        setting={"hideProfilToStrangers"}
        value={userStore.profilSettings.hideProfilToStrangers}
      />

      <Divider plain className="EditSettings__divider">
        Personal data
      </Divider>

      <SettingElementSwitch
        title={t("settings.showFirstName")}
        type={"profilSettings"}
        setting={"showFirstName"}
        value={userStore.profilSettings.showFirstName}
      />
      {userStore.profilSettings.showFirstName && (
        <SettingElementSwitch
          title={t("settings.showLastName")}
          type={"profilSettings"}
          setting={"showLastName"}
          value={userStore.profilSettings.showLastName}
          dependOnPrevious={true}
        />
      )}

      <SettingElementSwitch
        title={t("settings.showGender")}
        type={"profilSettings"}
        setting={"showGender"}
        value={userStore.profilSettings.showGender}
      />

      <SettingElementSwitch
        title={t("settings.showSexualOrientation")}
        type={"profilSettings"}
        setting={"showSexualOrientation"}
        value={userStore.profilSettings.showSexualOrientation}
      />

      <SettingElementSwitch
        title={t("settings.showAge")}
        type={"profilSettings"}
        setting={"showAge"}
        value={userStore.profilSettings.showAge}
      />

      <SettingElementSwitch
        title={t("settings.showLocation")}
        type={"profilSettings"}
        setting={"showLocation"}
        value={userStore.profilSettings.showLocation}
      />

      <Divider plain className="EditSettings__divider">
        Social connections
      </Divider>

      <SettingElementSwitch
        title={t("settings.showFriendListToStrangers")}
        type={"profilSettings"}
        setting={"showFriendListToStrangers"}
        value={userStore.profilSettings.showFriendListToStrangers}
      />
      {!userStore.profilSettings.showFriendListToStrangers && (
        <SettingElementSwitch
          title={t("settings.showFriendListToFriends")}
          type={"profilSettings"}
          setting={"showFriendListToFriends"}
          value={userStore.profilSettings.showFriendListToFriends}
          dependOnPrevious={true}
        />
      )}

      <SettingElementSwitch
        title={t("settings.showFollowingListToStrangers")}
        type={"profilSettings"}
        setting={"showFollowingListToStrangers"}
        value={userStore.profilSettings.showFollowingListToStrangers}
      />
      {!userStore.profilSettings.showFollowingListToStrangers && (
        <SettingElementSwitch
          title={t("settings.showFollowingListToFriends")}
          type={"profilSettings"}
          setting={"showFollowingListToFriends"}
          value={userStore.profilSettings.showFollowingListToFriends}
          dependOnPrevious={true}
        />
      )}
    </div>
  );
});
