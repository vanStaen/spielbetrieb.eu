import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";

import "./ProfileLinks.less";

export const ProfileLinks = observer(() => {
  const { t } = useTranslation();
  const [showLinksModal, setShowLinksModal] = useState(false);

  const userLinks = profileStore.links?.map((link) => {
    return link;
  });

  // TODO: Add links form

  return (
    <>
      {/* <EditLinksModal
        showLinksModal={showLinksModal}
        setShowLinksModal={setShowLinksModal}
      /> */}
      <div className="profileLinks__container">
        <ProfileMainTitle
          title={t("profile.links")}
          value={profileStore.links?.length}
          showEdit={showLinksModal}
          setShowEdit={setShowLinksModal}
        />
        <div className="profileLinks__main">
          {profileStore.links?.length ? (
            <div>{userLinks}</div>
          ) : (
            <div className="profileLinks__empty">{t("profile.nothingYet")}</div>
          )}
        </div>
      </div>
    </>
  );
});
