import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileWishes.less";

export const ProfileWishes = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileWishes__container">
      <div className="profileWishes__title">
        {t("profile.wishes")} ({profileStore.wishes?.length})
      </div>
    </div>
  );
});
