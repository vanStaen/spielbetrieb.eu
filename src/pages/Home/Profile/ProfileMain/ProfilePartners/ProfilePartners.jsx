import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";

import "./ProfilePartners.less";

export const ProfilePartners = observer(() => {
  const [showPartnersModal, setShowPartnersModal] = useState(false);
  const { t } = useTranslation();

  // TODO: add partner form

  return (
    <>
      <div className="profilePartners__container">
        <ProfileMainTitle
          title={t("profile.partners")}
          showEdit={showPartnersModal}
          setShowEdit={setShowPartnersModal}
        />
        <div className="profilePartners__main">
          {
            // TODO: make a nice partner card
            profileStore.partners?.length ? (
              <div>
                {profileStore.partners.map((partners) => partners.name)}
              </div>
            ) : (
              <div className="profilePartners__empty">
                {t("profile.nothingYet")}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
});
