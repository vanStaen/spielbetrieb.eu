import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileTags.less";

export const ProfileTags = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileTags__container">
      <div className="profileTags__title">
        {t("profile.tags")} ({profileStore.tags?.length})
      </div>
    </div>
  );
});
