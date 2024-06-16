import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../Components/ProfileMainTitle/ProfileMaintitle";

import "./ProfileWishes.less";

export const ProfileWishes = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileWishes__container">
      <ProfileMainTitle
        title={t("profile.wishes")}
        value={profileStore.wishes?.length}
      />
    </div>
  );
});
