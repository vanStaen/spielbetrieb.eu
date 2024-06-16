import React from "react";
import { observer } from "mobx-react";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../Components/ProfileMainTitle/ProfileMaintitle";
import { useTranslation } from "react-i18next";

import "./ProfileDescription.less";

export const ProfileDescription = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="profileDescription__container">
      <ProfileMainTitle
        title={t("profile.description")}
        value={profileStore.description?.length}
      />
    </div>
  );
});
