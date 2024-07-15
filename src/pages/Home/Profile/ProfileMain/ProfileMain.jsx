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
import { partnerStore } from "../../../../store/partnerStore/partnerStore";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  const { isPartner, thisIsMine } = props;

  // TODO adapt component to work with isPartner

  return isPartner ? (
    <div className="profil__mainContainer">
      <ProfileName />
      {(partnerStore.description || thisIsMine) && (
        <ProfileDescription isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(partnerStore.photos?.length || thisIsMine) && (
        <ProfilePhotos isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(partnerStore.events?.length || thisIsMine) && (
        <ProfileEvents isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(partnerStore.tags?.length || thisIsMine) && (
        <ProfileTags isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(partnerStore.links?.length || thisIsMine) && (
        <ProfileLinks isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(partnerStore.reviews?.length || thisIsMine) && (
        <ProfileReviews isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
    </div>
  ) : (
    <div className="profil__mainContainer">
      {(profileStore.description || thisIsMine) && (
        <ProfileDescription isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(profileStore.wishes || thisIsMine) && (
        <ProfileWishes isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(profileStore.interests || thisIsMine) && (
        <ProfileInterests isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(profileStore.photos?.length || thisIsMine) && (
        <ProfilePhotos isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(profileStore.events?.length || thisIsMine) && (
        <ProfileEvents isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(profileStore.tags?.length || thisIsMine) && (
        <ProfileTags isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(profileStore.partners?.length || thisIsMine) && (
        <ProfilePartners isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(profileStore.links?.length || thisIsMine) && (
        <ProfileLinks isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
    </div>
  );
});
