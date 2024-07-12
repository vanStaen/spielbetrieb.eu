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

  return isPartner ? (
    <div className="profil__mainContainer">
      <ProfileName />
      {(partnerStore.description || thisIsMine) && (
        <ProfileDescription isPartner thisIsMine />
      )}
      {(partnerStore.photos?.length || thisIsMine) && (
        <ProfilePhotos isPartner thisIsMine />
      )}
      {(partnerStore.events?.length || thisIsMine) && (
        <ProfileEvents isPartner thisIsMine />
      )}
      {(partnerStore.tags?.length || thisIsMine) && (
        <ProfileTags isPartner thisIsMine />
      )}
      {(partnerStore.links?.length || thisIsMine) && (
        <ProfileLinks isPartner thisIsMine />
      )}
      {partnerStore.reviews?.length && <ProfileReviews isPartner />}
    </div>
  ) : (
    <div className="profil__mainContainer">
      {(profileStore.description || thisIsMine) && (
        <ProfileDescription thisIsMine />
      )}
      {(profileStore.wishes || thisIsMine) && <ProfileWishes thisIsMine />}
      {(profileStore.interests || thisIsMine) && (
        <ProfileInterests thisIsMine />
      )}
      {(profileStore.photos?.length || thisIsMine) && (
        <ProfilePhotos thisIsMine />
      )}
      {(profileStore.events?.length || thisIsMine) && (
        <ProfileEvents thisIsMine />
      )}
      {(profileStore.tags?.length || thisIsMine) && <ProfileTags thisIsMine />}
      {(profileStore.partners?.length || thisIsMine) && (
        <ProfilePartners thisIsMine />
      )}
      {(profileStore.links?.length || thisIsMine) && (
        <ProfileLinks thisIsMine />
      )}
    </div>
  );
});
