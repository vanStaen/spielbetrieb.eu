import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditLinksModal } from "./EditLinksModal/EditLinksModal";

import "./ProfileLinks.less";

// TODO: Check if links are broken.

export const ProfileLinks = observer(() => {
  const { t } = useTranslation();
  const [showLinksModal, setShowLinksModal] = useState(false);

  const userLinks = profileStore.links?.map((link) => {
    return link;
  });

  return (
    <>
      <EditLinksModal
        showLinksModal={showLinksModal}
        setShowLinksModal={setShowLinksModal}
      />
      <div className="profileLinks__container">
        <ProfileMainTitle
          title={t("profile.links")}
          value={profileStore.links?.length}
          showEdit={showLinksModal}
          setShowEdit={setShowLinksModal}
        />
        <div className="profileLinks__main">
          {profileStore.links?.length ? (
            <div>
              {userLinks?.map((link, index) => (
                <div key={index}>
                  <a
                    className="profileLinks__link"
                    href={link.slice(0, 4) === "http" ? link : `http://${link}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="profileLinks__empty">{t("profile.nothingYet")}</div>
          )}
        </div>
      </div>
    </>
  );
});
