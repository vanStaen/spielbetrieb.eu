import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ProfileMainTitle } from "../Components/ProfileMainTitle/ProfileMaintitle";
import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileEvents.less";

export const ProfileEvents = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="profileEvents__container">
      <ProfileMainTitle
        title={t("profile.events")}
        value={profileStore.events?.length}
        addEvent={true}
      />
    </div>
  );
});
