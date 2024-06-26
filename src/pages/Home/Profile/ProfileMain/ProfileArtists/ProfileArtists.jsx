import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../../../store/userStore/userStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";

import "./ProfileArtists.less";

export const ProfileArtists = observer(() => {
  const [showArtistsModal, setShowArtistsModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="profileArtists__container">
        <ProfileMainTitle
          title={t("profile.artists")}
          showEdit={showArtistsModal}
          setShowEdit={setShowArtistsModal}
        />
        <div className="profileArtists__main">
          {
            // TODO: make a nice artist card
            userStore.artists?.length ? (
              <div>{userStore.artists.map((artists) => artists.name)}</div>
            ) : (
              <div className="profileArtists__empty">
                {t("profile.nothingYet")}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
});
