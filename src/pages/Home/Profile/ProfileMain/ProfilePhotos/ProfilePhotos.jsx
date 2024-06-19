import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMaintitle"

import "./ProfilePhotos.less";

export const ProfilePhotos = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profilePhotos__container">
      <ProfileMainTitle
        title={t("profile.photos")}
        value={profileStore.photos?.length}
        addPhoto={true}
      />
      <div className="profileDescription__main">
        {!profileStore.photos && (
          <div className="profileDescription__empty">
            {t("profile.nothingYet")}
          </div>
        )}
      </div>
    </div>
  );
});
