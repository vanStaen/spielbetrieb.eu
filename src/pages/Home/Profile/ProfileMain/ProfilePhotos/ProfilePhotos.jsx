import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";

import "./ProfilePhotos.less";

export const ProfilePhotos = observer((props) => {
  const { thisIsMine } = props;
  const { t } = useTranslation();

  // TODO1: add photo form
  // TODO1: use gallery overlay to show the pictures
  // TODO1: add a comment feature to the gallery overlay(?)
  return (
    <div className="profilePhotos__container">
      <ProfileMainTitle
        title={t("profile.photos")}
        value={profileStore.photos?.length}
        addPhoto={true}
        thisIsMine={thisIsMine}
      />
      <div className="profilePhotos__main">
        {!profileStore.photos?.length && (
          <div className="profilePhotos__empty">{t("profile.nothingYet")}</div>
        )}
      </div>
    </div>
  );
});
