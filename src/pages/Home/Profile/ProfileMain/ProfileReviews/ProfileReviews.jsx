import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileReviews.less";

export const ProfileReviews = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileReviews__container">
      <div className="profileMain__title">
        {t("profile.reviews")} ({profileStore.reviews?.length})
      </div>
    </div>
  );
});
