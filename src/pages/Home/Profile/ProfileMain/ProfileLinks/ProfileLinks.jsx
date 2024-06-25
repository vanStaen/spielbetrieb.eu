import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditLinksModal } from "./EditLinksModal/EditLinksModal";
import { nameParser } from "../../../../../helpers/dev/nameParser";

import "./ProfileLinks.less";

export const ProfileLinks = observer(() => {
  const { t } = useTranslation();
  const [showLinksModal, setShowLinksModal] = useState(false);

  const userLinks = profileStore.links?.map((link) => {
    return link;
  });

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
            <div className="profileLinks__empty">
              {t("profile.nothingYet")}
            </div>
          )}
        </div>
      </div>
    </>
  );
});
