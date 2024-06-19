import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditTextModal } from "../profileComponents/EditTextModal/EditTextModal";

import "./ProfileWishes.less";

export const ProfileWishes = observer(() => {
  const [showWishesModal, setShowWishesModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <EditTextModal
        field="wishes"
        profileStoreSet={profileStore.setWishes}
        showModal={showWishesModal}
        setShowModal={setShowWishesModal}
      />
      <div className="profileWishes__container">
        <ProfileMainTitle
          title={t("profile.wishes")}
          showEdit={showWishesModal}
          setShowEdit={setShowWishesModal}
        />
        <div className="profileDescription__main">
          {profileStore.wishes ? (
            <div>{profileStore.wishes}</div>
          ) : (
            <div className="profileDescription__empty">
              {t("profile.nothingYet")}
            </div>
          )}
        </div>
      </div>
    </>
  );
});
