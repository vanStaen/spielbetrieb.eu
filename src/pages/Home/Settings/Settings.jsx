import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Divider, Switch, Radio, notification } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { postSendRecoverLink } from "../../../components/PasswordRecover/postSendRecoverLink";
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
  }, [])

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

  const resetPasswordLink = async () => {
    try {
      await postSendRecoverLink(userStore.email);
      notification.open({
        duration: 0,
        message: <TitleRecoverEmailSent />,
        description: <DescRecoverEmailSent />,
        placement: "bottomRight",
        className: "customNotification",
      });
    } catch (error) {
      notification.error({
        message: error.message,
        placement: "bottomRight",
      });
    }
  };

  return (
    <div className="EditSettings__main">
      {userStore.isLoading ? (
        <div className="EditSettings__loader">
          <CustomSpinner text={`${t("general.loading")} (${t('settings.settings')})`} />
        </div>
      ) : (
        <div className="EditSettings__container">
          <div className="EditSettings__centerDiv">
            <div className="EditSettings__title">
              {t("profile.editYourSetting")}
            </div>
          </div>
          <div className="EditSettings__Spacer" />
          <Divider orientation="left" plain>
            {t("profile.accountSettings")}
          </Divider>
          <div className="EditSettings__singleSetting">
            {t("settings.triggerPasswordReset")}{" "}
            <span onClick={resetPasswordLink} className="EditSettings__link">
              {t("settings.clickHere")}
            </span>
          </div>
          <div className="EditSettings__Spacer" />
          <UserNameUpdate />
          <div className="EditSettings__SpacerBeforeDivider" />
          <Divider orientation="left" plain>
            {t("profile.displaySettings")}
          </Divider>
          <div className="EditSettings__singleSetting">
            {t("settings.userGender")}
            &nbsp;&nbsp;&nbsp;
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
          <div className="EditSettings__Spacer" />
          <div className="EditSettings__singleSetting">
            {t("general.language")}
            &nbsp;&nbsp;&nbsp;
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
          <div className="EditSettings__SpacerBeforeDivider" />
          <Divider orientation="left" plain>
            {t("profile.profileSettings")}
          </Divider>
          <div className="EditSettings__singleSetting">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={() => {
                changeProfilSettingsHandler(
                  "showLastSeenOnline",
                  !userStore.profilSettings.showLastSeenOnline,
                );
              }}
              checked={userStore.profilSettings.showLastSeenOnline}
            />{" "}
            {t("profile.settingShowLastOnline")}
          </div>

          <SettingElementSwitch
            title={t("settings.hideProfilToStrangers")}
            type={'profilSettings'}
            setting={'hideProfilToStrangers'}
            value={userStore.profilSettings.hideProfilToStrangers}
          />

          <SettingElementSwitch
            title={t("settings.showLastName")}
            type={'profilSettings'}
            setting={'showLastName'}
            value={userStore.profilSettings.showLastName}
          />

          <Divider orientation="left" plain>
            {t("profile.emailSettings")}
          </Divider>

          <SettingElementSwitch
            title={t("settings.sendEmailOnFriendRequest")}
            type={'emailSettings'}
            setting={'sendEmailFriendRequest'}
            value={userStore.emailSettings.sendEmailFriendRequest}
          />

          <SettingElementSwitch
            title={t("settings.sendEmailWhenNewMessage")}
            type={'emailSettings'}
            setting={'sendEmailNewMessage'}
            value={userStore.emailSettings.sendEmailNewMessage}
          />

          <SettingElementSwitch
            title={t("settings.keepMeInformedAboutSielbetrieb")}
            type={'emailSettings'}
            setting={'sendEmailMarketing'}
            value={userStore.emailSettings.sendEmailMarketing}
          />


          <Divider orientation="left" plain>
            {t("profile.dangerZone")}
          </Divider>
          <div className="EditSettings__centerDiv">
            <DeleteAccountButton />
          </div>

        </div>
      )}
    </div>
  );
});

const TitleRecoverEmailSent = () => {
  const { t } = useTranslation();
  return <>✅ {t("general.youGotMail")}</>;
};

const DescRecoverEmailSent = () => {
  const { t } = useTranslation();
  return <>{t("login.recoverEmailSent")}</>;
};
