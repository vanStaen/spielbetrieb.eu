import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../store/profileStore/profileStore";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  const { t } = useTranslation();

  return (
    <div className="profil__mainContainer">
      here will come some history/wallpaper feature
    </div>
  );
});
