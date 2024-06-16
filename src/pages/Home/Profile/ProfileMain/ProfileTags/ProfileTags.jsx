import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../Components/ProfileMainTitle/ProfileMaintitle";

import "./ProfileTags.less";

export const ProfileTags = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileTags__container">
      <ProfileMainTitle
        title={t("profile.tags")}
        value={profileStore.tags?.length}
      />
    </div>
  );
});
