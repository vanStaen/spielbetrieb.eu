import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { profileStore } from "../../../../../store/profileStore/profileStore";
import { EditTextModal } from "../profileComponents/EditTextModal/EditTextModal";

import "./ProfileInterests.less";

export const ProfileInterests = observer((props) => {
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const { thisIsMine } = props;
  const { t } = useTranslation();

  return (
    <>
      <EditTextModal
        field="interests"
        profileStoreSet={profileStore.setInterests}
        showModal={showInterestsModal}
        setShowModal={setShowInterestsModal}
      />
      <div className="profileInterests__container">
        <ProfileMainTitle
          title={t("profile.interests")}
          showEdit={showInterestsModal}
          setShowEdit={setShowInterestsModal}
          thisIsMine={thisIsMine}
        />
        <div className="profileDescription__main">
          {profileStore.interests ? (
            <div>{profileStore.interests}</div>
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
