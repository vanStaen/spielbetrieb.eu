import React from "react";
import { observer } from "mobx-react";

import { ProfileEvents } from "./ProfileEvents/ProfileEvents";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  return (
    <div className="profil__mainContainer">
      <ProfileEvents />
    </div>
  );
});
