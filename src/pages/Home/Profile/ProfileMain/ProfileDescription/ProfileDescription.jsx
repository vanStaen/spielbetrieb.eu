import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { partnerStore } from "../../../../../store/partnerStore/partnerStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditTextModal } from "../profileComponents/EditTextModal/EditTextModal";

import "./ProfileDescription.less";

export const ProfileDescription = observer((props) => {
  const { t } = useTranslation();
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const { isPartner, thisIsMine } = props;
  const description = isPartner
    ? partnerStore.description
    : profileStore.description;

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
          title={
            isPartner ? t("partner.description") : t("profile.description")
          }
          showEdit={showDescriptionModal}
          setShowEdit={setShowDescriptionModal}
          thisIsMine={thisIsMine}
        />
        <div className="profileDescription__main">
          {description ? (
            <div>{description}</div>
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
