import React from "react";
import { observer } from "mobx-react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { SettingElementSwitch } from "./SettingElement/SettingElementSwitch";

export const EmailSettings = observer(() => {
  const { t } = useTranslation();
  const partnerDisabled = userStore.isPartner;

  return (
    <div className="EditSettings__container">
      <Divider orientation="left" plain className="EditSettings__divider">
        Interaction with users
      </Divider>

      <SettingElementSwitch
        title={t("settings.sendEmailOnFriendRequest")}
        type={"emailSettings"}
        setting={"sendEmailFriendRequest"}
        value={userStore.emailSettings.sendEmailFriendRequest}
        partnerDisabled={partnerDisabled}
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

      <Divider orientation="left" plain className="EditSettings__divider">
        Interaction with partners
      </Divider>

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
    </div>
  );
});
