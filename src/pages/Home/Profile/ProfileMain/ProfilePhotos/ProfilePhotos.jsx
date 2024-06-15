import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfilePhotos.less";

export const ProfilePhotos = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profilePhotos__container">
      <div className="profilePhotos__title">
        {t("profile.photos")} ({profileStore.photos?.length})
      </div>
    </div>
  );
});
