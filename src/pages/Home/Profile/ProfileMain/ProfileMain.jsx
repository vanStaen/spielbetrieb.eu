import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  const { t } = useTranslation();

  return <div className="profil__mainContainer">{/* Placeholder */}</div>;
});
