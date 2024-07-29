import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { partnerStore } from "../../../../../store/partnerStore/partnerStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";

import "./ProfileReviews.less";

export const ProfileReviews = observer((props) => {
  const { thisIsMine } = props;
  const { t } = useTranslation();

  return (
    <div className="profileReviews__container">
      <ProfileMainTitle
        title={t("profile.reviews")}
        value={partnerStore.reviews?.length}
        editable={false}
        thisIsMine={thisIsMine}
      />
      <div className="profileReviews__main">
        {!partnerStore.reviews?.length && (
          <div className="profileReviews__empty">{t("profile.nothingYet")}</div>
        )}
      </div>
    </div>
  );
});
