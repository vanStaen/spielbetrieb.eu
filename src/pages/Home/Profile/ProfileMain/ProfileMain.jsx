import React from "react";
import { observer } from "mobx-react";

import { ProfileEvents } from "./ProfileEvents/ProfileEvents";
import { ProfileTags } from "./ProfileTags/ProfileTags";
import { ProfileDescription } from "./ProfileDescription/ProfileDescription";
import { ProfileInterests } from "./ProfileInterests/ProfileInterests";
import { ProfileWishes } from "./ProfileWishes/ProfileWishes";
import { ProfilePhotos } from "./ProfilePhotos/ProfilePhotos";
import { ProfileReviews } from "./ProfileReviews/ProfileReviews";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  return (
    <div className="profil__mainContainer">
      <ProfileDescription />
      <ProfileWishes />
      <ProfileInterests />
      <ProfilePhotos />
      <ProfileEvents />
      <ProfileTags />
      <ProfileReviews />
    </div>
  );
});
