import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileInterests.less";

export const ProfileInterests = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileInterests__container">
      <div className="profileInterests__title">
        {t("profile.interests")} ({profileStore.interests?.length})
      </div>
    </div>
  );
});
