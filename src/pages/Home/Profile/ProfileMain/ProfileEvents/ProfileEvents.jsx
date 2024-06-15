import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileEvents.less";

export const ProfileEvents = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileEvents__container">
      <div className="profileEvents__title">
        {t("profile.events")} ({profileStore.events?.length})
      </div>
    </div>
  );
});
