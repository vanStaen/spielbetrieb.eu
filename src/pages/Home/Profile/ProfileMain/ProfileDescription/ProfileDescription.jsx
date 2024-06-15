import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileDescription.less";

export const ProfileDescription = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileDescription__container">
      <div className="profileMain__title">
        {t("profile.description")} ({profileStore.description?.length})
      </div>
    </div>
  );
});
