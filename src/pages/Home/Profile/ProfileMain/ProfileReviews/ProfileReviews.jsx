import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";

import "./ProfileReviews.less";

export const ProfileReviews = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileReviews__container">
      <ProfileMainTitle
        title={t("profile.reviews")}
        value={profileStore.reviews?.length}
        editable={false}
      />
      <div className="profileReviews__main">
        {!profileStore.reviews && (
          <div className="profileReviews__empty">{t("profile.nothingYet")}</div>
        )}
      </div>
    </div>
  );
});
