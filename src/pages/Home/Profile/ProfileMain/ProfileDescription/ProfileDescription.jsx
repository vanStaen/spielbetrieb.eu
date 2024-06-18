import React, { useState } from "react";
import { observer } from "mobx-react";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../Components/ProfileMainTitle/ProfileMaintitle";
import { useTranslation } from "react-i18next";
import { EditDescriptionModal } from "./EditDescriptionModal/EditTagsModal";

import "./ProfileDescription.less";

export const ProfileDescription = observer(() => {
  const { t } = useTranslation();
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  return (
    <>
      <EditDescriptionModal
        showDescriptionModal={showDescriptionModal}
        setShowDescriptionModal={setShowDescriptionModal}
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
