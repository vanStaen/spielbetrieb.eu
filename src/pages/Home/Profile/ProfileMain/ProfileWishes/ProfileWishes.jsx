import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditTextModal } from "../profileComponents/EditTextModal/EditTextModal";

import "./ProfileWishes.less";

export const ProfileWishes = observer((props) => {
  const [showWishesModal, setShowWishesModal] = useState(false);
  const { t } = useTranslation();
  const { thisIsMine } = props;

  return (
    <>
      <EditTextModal
        field="wishes"
        storeSetter={profileStore.setWishes}
        showModal={showWishesModal}
        setShowModal={setShowWishesModal}
      />
      <div className="profileWishes__container">
        <ProfileMainTitle
          title={t("profile.wishes")}
          showEdit={showWishesModal}
          setShowEdit={setShowWishesModal}
          thisIsMine={thisIsMine}
        />
        <div className="profileWishes__main">
          {profileStore.wishes ? (
            <div>{profileStore.wishes}</div>
          ) : (
            <div className="profileWishes__empty">
              {t("profile.nothingYet")}
            </div>
          )}
        </div>
      </div>
    </>
  );
});
