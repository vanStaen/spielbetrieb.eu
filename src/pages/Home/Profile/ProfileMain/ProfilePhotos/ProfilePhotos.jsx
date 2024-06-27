import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";

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
      <div className="profilePhotos__main">
        {!profileStore.photos?.length && (
          <div className="profilePhotos__empty">{t("profile.nothingYet")}</div>
        )}
      </div>
    </div>
  );
});
