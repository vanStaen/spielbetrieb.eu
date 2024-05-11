import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Divider, Radio } from "antd";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { updateLanguage } from "./updateLanguage";
import { updateGender } from "./updateGender";
import { UserNameUpdate } from "./UserNameUpdate/UserNameUpdate";
import { DeleteAccountButton } from "./DeleteAccountButton/DeleteAccountButton";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { SettingElementSwitch } from "./SettingElement/SettingElementSwitch";

import "./Settings.less";

export const Settings = observer(() => {
  const { i18n, t } = useTranslation();
  const initLanguage = i18n.language.slice(0, 2);

  useEffect(() => {
    userStore.isLoading && userStore.fetchUserData();
  }, []);

  const changeLanguageHandler = (event) => {
    const value = event.target.value;
    if (value === "en") {
      i18n.changeLanguage("en-US");
    } else if (value === "fr") {
      i18n.changeLanguage("fr-FR");
    } else if (value === "de") {
      i18n.changeLanguage("de-DE");
    }
    updateLanguage(value);
  };

  const changeGenderHandler = (event) => {
    const value = parseInt(event.target.value);
    userStore.setGender(value);
    updateGender(value);
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
        <div className="EditSettings__container">
          <Divider plain className="EditSettings__divider">
            {t("settings.accountSettings")}
          </Divider>

          <div className="EditSettings__singleSetting">
            <div className="EditSettings__centerDiv">
              <Radio.Group
                defaultValue={String(userStore.gender)}
                buttonStyle="solid"
                onChange={changeGenderHandler}
              >
                <Radio.Button value="1">{t("gender.male")}</Radio.Button>
                <Radio.Button value="2">{t("gender.female")}</Radio.Button>
                <Radio.Button value="3">{t("gender.other")}</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <div className="EditSettings__spacerDiv" />

          <div className="EditSettings__singleSetting">
            <div className="EditSettings__centerDiv">
              <Radio.Group
                defaultValue={initLanguage}
                buttonStyle="solid"
                onChange={changeLanguageHandler}
              >
                <Radio.Button value="en">English</Radio.Button>
                <Radio.Button value="de">Deutsch</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <div className="EditSettings__spacerDiv" />

          <UserNameUpdate />

          <div className="EditSettings__spacerDiv" />
          <Divider plain className="EditSettings__divider">
            {t("settings.profileSettings")}
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

          <SettingElementSwitch
            title={t("settings.showFirstName")}
            type={"profilSettings"}
            setting={"showFirstName"}
            value={userStore.profilSettings.showFirstName}
          />

          <SettingElementSwitch
            title={t("settings.showLastName")}
            type={"profilSettings"}
            setting={"showLastName"}
            value={userStore.profilSettings.showLastName}
          />

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

          <div className="EditSettings__spacerDiv" />
          <Divider plain className="EditSettings__divider">
            {t("settings.emailSettings")}
          </Divider>

          <SettingElementSwitch
            title={t("settings.sendEmailOnFriendRequest")}
            type={"emailSettings"}
            setting={"sendEmailFriendRequest"}
            value={userStore.emailSettings.sendEmailFriendRequest}
          />

          <SettingElementSwitch
            title={t("settings.sendEmailWhenNewMessage")}
            type={"emailSettings"}
            setting={"sendEmailNewMessage"}
            value={userStore.emailSettings.sendEmailNewMessage}
          />

          <SettingElementSwitch
            title={t("settings.sendEmailNotification")}
            type={"emailSettings"}
            setting={"sendEmailNotification"}
            value={userStore.emailSettings.sendEmailNotification}
          />

          <SettingElementSwitch
            title={t("settings.sendEmailPartnerEvent")}
            type={"emailSettings"}
            setting={"sendEmailPartnerEvent"}
            value={userStore.emailSettings.sendEmailPartnerEvent}
          />

          <SettingElementSwitch
            title={t("settings.keepMeInformedAboutSielbetrieb")}
            type={"emailSettings"}
            setting={"sendEmailMarketing"}
            value={userStore.emailSettings.sendEmailMarketing}
          />

          <div className="EditSettings__spacerDiv" />
          <Divider plain className="EditSettings__divider">
            {t("settings.dangerZone")}
          </Divider>

          <div className="EditSettings__centerDiv">
            <DeleteAccountButton />
          </div>
        </div>
      )}
    </div>
  );
});
