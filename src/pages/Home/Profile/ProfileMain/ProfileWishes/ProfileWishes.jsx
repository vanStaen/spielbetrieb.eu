import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { ProfileMainTitle } from "../Components/ProfileMainTitle/ProfileMaintitle";
import { EditTagsModal } from "../Components/EditTagsModal/EditTagsModal";

import "./ProfileWishes.less";

export const ProfileWishes = observer(() => {
  const [showWishesModal, setShowWishesModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <EditTagsModal
        defaultValue={profileStore.wishes}
        titleValue={"Edit Wishes"}
        showTagsModal={showWishesModal}
        setShowTagsModal={setShowWishesModal}
        updateDataBase={(value) => {
          console.log("update", value);
        }}
        updateProfileStore={() => {
          profileStore.setWishes();
        }}
      />
      <div className="profileWishes__container">
        <ProfileMainTitle
          title={t("profile.wishes")}
          value={profileStore.wishes?.length}
          showEdit={showWishesModal}
          setShowEdit={setShowWishesModal}
        />
        <div className="profileDescription__main">
          {!profileStore.wishes.length && (
            <div className="profileDescription__empty">
              {t("profile.nothingYet")}
            </div>
          )}
        </div>
      </div>
    </>
  );
});
