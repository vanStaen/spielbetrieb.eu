import React from "react";
import { observer } from "mobx-react";

import { ProfileEvents } from "./ProfileEvents/ProfileEvents";
import { ProfileTags } from "./ProfileTags/ProfileTags";
import { ProfileDescription } from "./ProfileDescription/ProfileDescription";
import { ProfileInterests } from "./ProfileInterests/ProfileInterests";
import { ProfileWishes } from "./ProfileWishes/ProfileWishes";
import { ProfilePhotos } from "./ProfilePhotos/ProfilePhotos";
import { ProfileReviews } from "./ProfileReviews/ProfileReviews";

import { profileStore } from "../../../../store/profileStore/profileStore";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  return (
    <div className="profil__mainContainer">
      <ProfileDescription />
      {!profileStore.isPartner && <ProfileWishes />}
      {!profileStore.isPartner && <ProfileInterests />}
      <ProfilePhotos />
      <ProfileEvents />
      <ProfileTags />
      {profileStore.isPartner && <ProfileReviews />}
    </div>
  );
});
