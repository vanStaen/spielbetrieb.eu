import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditTextModal } from "../profileComponents/EditTextModal/EditTextModal";

import "./ProfileDescription.less";

export const ProfileDescription = observer(() => {
  const { t } = useTranslation();
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  return (
    <>
      <EditTextModal
        field="description"
        profileStoreSet={profileStore.setDescription}
        showModal={showDescriptionModal}
        setShowModal={setShowDescriptionModal}
      />
      <div className="profileDescription__container">
        <ProfileMainTitle
          title={t("profile.description")}
          showEdit={showDescriptionModal}
          setShowEdit={setShowDescriptionModal}
        />
        <div className="profileDescription__main">
          {profileStore.description ? (
            <div>{profileStore.description}</div>
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
