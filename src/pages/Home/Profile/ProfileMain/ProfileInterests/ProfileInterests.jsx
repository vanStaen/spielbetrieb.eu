import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ProfileMainTitle } from "../ProfileMainTitle/ProfileMaintitle";
import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileInterests.less";

export const ProfileInterests = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileInterests__container">
      <ProfileMainTitle
        title={t("profile.interests")}
        value={profileStore.interests.length}
      />
      <div className="profileDescription__main">
        {!profileStore.interests.length && (
          <div className="profileDescription__empty">
            {t("profile.nothingYet")}
          </div>
        )}
      </div>
    </div>
  );
});
