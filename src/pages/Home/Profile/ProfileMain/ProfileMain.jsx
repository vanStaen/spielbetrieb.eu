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
import { userStore } from "../../../../store/userStore/userStore";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  const thisIsMe = userStore._id === profileStore._id;

  return (
    <div className="profil__mainContainer">
      {(profileStore.description || thisIsMe) && <ProfileDescription />}
      {(profileStore.wishes || thisIsMe) && !profileStore.isPartner && (
        <ProfileWishes />
      )}
      {(profileStore.interests || thisIsMe) && !profileStore.isPartner && (
        <ProfileInterests />
      )}
      {(profileStore.photos || thisIsMe) && <ProfilePhotos />}
      {(profileStore.events || thisIsMe) && <ProfileEvents />}
      {(profileStore.tags.length || thisIsMe) && <ProfileTags />}
      {(profileStore.reviews || thisIsMe) && profileStore.isPartner && (
        <ProfileReviews />
      )}
    </div>
  );
});
