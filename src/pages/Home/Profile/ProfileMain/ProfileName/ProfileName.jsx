import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { partnerStore } from "../../../../../store/partnerStore/partnerStore";
import { ProfileMainTitle } from "../profileComponents/ProfileMainTitle/ProfileMainTitle";
import { EditTextModal } from "../profileComponents/EditTextModal/EditTextModal";

import "./ProfileName.less";

export const ProfileName = observer((props) => {
  return (
    <>
      <div className="profileName__container">
        <div className="profileName__main">
          {partnerStore.name}
        </div>
      </div>
    </>
  );
});
