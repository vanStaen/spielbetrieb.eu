import React from "react";
import { observer } from "mobx-react";

import { ProfileEvents } from "./ProfileEvents/ProfileEvents";
import { ProfileTags } from "./ProfileTags/ProfileTags";
import { ProfileLinks } from "./ProfileLinks/ProfileLinks";
import { ProfileDescription } from "./ProfileDescription/ProfileDescription";
import { ProfileInterests } from "./ProfileInterests/ProfileInterests";
import { ProfileWishes } from "./ProfileWishes/ProfileWishes";
import { ProfilePhotos } from "./ProfilePhotos/ProfilePhotos";
import { ProfileReviews } from "./ProfileReviews/ProfileReviews";
import { ProfilePartners } from "./ProfilePartners/ProfilePartners";

import { profileStore } from "../../../../store/profileStore/profileStore";
import { userStore } from "../../../../store/userStore/userStore";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  const thisIsMe = userStore.id === profileStore.id;

  return (
    <div className="profil__mainContainer">
      {(profileStore.description || thisIsMe) && <ProfileDescription />}
      {(profileStore.wishes || thisIsMe) && !profileStore.isPartner && (
        <ProfileWishes />
      )}
      {(profileStore.interests || thisIsMe) && !profileStore.isPartner && (
        <ProfileInterests />
      )}
      {(profileStore.photos?.length || thisIsMe) && <ProfilePhotos />}
      {(profileStore.events?.length || thisIsMe) && <ProfileEvents />}
      {(profileStore.tags?.length || thisIsMe) && <ProfileTags />}
      {(profileStore.link?.length || thisIsMe) && <ProfileLinks />}
      {(profileStore.partners?.length || thisIsMe) && <ProfilePartners />}
      {profileStore.reviews?.length && profileStore.isPartner && (
        <ProfileReviews />
      )}
    </div>
  );
});
