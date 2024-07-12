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
import { ProfileName } from "./ProfileName/ProfileName";

import { profileStore } from "../../../../store/profileStore/profileStore";
import { userStore } from "../../../../store/userStore/userStore";
import { partnerStore } from "../../../../store/partnerStore/partnerStore";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  const thisIsMe = userStore.id === profileStore.id;
  const { isPartner } = props;

  console.log(partnerStore.description);

  return (
    isPartner ?
      <div className="profil__mainContainer">
        <ProfileName />
        {(partnerStore.description || thisIsMe) && <ProfileDescription isPartner />}
        {(partnerStore.photos?.length || thisIsMe) && <ProfilePhotos isPartner />}
        {(partnerStore.events?.length || thisIsMe) && <ProfileEvents isPartner />}
        {(partnerStore.tags?.length || thisIsMe) && <ProfileTags isPartner />}
        {(partnerStore.links?.length || thisIsMe) && <ProfileLinks isPartner />}
        {partnerStore.reviews?.length && <ProfileReviews isPartner />}
      </div>
      :
      <div className="profil__mainContainer">
        {(profileStore.description || thisIsMe) && <ProfileDescription />}
        {(profileStore.wishes || thisIsMe) && <ProfileWishes />}
        {(profileStore.interests || thisIsMe) && <ProfileInterests />}
        {(profileStore.photos?.length || thisIsMe) && <ProfilePhotos />}
        {(profileStore.events?.length || thisIsMe) && <ProfileEvents />}
        {(profileStore.tags?.length || thisIsMe) && <ProfileTags />}
        {(profileStore.partners?.length || thisIsMe) && <ProfilePartners />}
        {(profileStore.links?.length || thisIsMe) && <ProfileLinks />}
      </div>
  );
});
