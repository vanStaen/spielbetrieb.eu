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
import { pageStore } from "../../../../store/pageStore/pageStore";

import "./ProfileMain.less";

export const ProfileMain = observer((props) => {
  const { isPartner, thisIsMine } = props;

  const calcNumberOfTags = () => {
    if (thisIsMine) {
      return isPartner ? partnerStore.tags?.length : profileStore.tags?.length;
    } else {
      const tagsToVerify = isPartner ? partnerStore.tags : profileStore.tags;
      const allFoundTags = pageStore.tags.filter((tag) =>
        tagsToVerify.includes(parseInt(tag.id)),
      );
      return allFoundTags.filter((tag) => tag.validated)?.length;
    }
  };

  const calcNumberOfEvents = () => {
    if (thisIsMine) {
      return isPartner ? partnerStore.events?.length : profileStore.events?.length;
    } else {
      const eventsToVerify = isPartner ? partnerStore.events : profileStore.events;
      return eventsToVerify.filter((events) => events.validated)?.length;
    }
  };

  const calcNumberOfPartners = () => {
    if (isPartner) {
      return null;
    } else if (thisIsMine && !isPartner) {
      return profileStore.partners?.length;
    } else {
      return profileStore.partners?.filter((partner) => partner.pending === false)?.length;
    }
  };

  const numberOfTags = calcNumberOfTags();
  const numberOfEvents = calcNumberOfEvents();
  const numberOfPartners = calcNumberOfPartners();

  return isPartner ? (
    <div className="profil__mainContainer">
      <ProfileName />
      {(partnerStore.description || thisIsMine) && (
        <ProfileDescription isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(partnerStore.photos?.length || thisIsMine) && (
        <ProfilePhotos isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
      {(numberOfEvents || thisIsMine) && (
        <ProfileEvents isPartner={isPartner} thisIsMine={thisIsMine} numberOfEvents={numberOfEvents} />
      )}
      {(numberOfTags || thisIsMine) && (
        <ProfileTags
          isPartner={isPartner}
          thisIsMine={thisIsMine}
          numberOfTags={numberOfTags}
        />
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
      {(numberOfEvents || thisIsMine) && (
        <ProfileEvents isPartner={isPartner} thisIsMine={thisIsMine} numberOfEvents={numberOfEvents} />
      )}
      {(numberOfTags || thisIsMine) && (
        <ProfileTags
          isPartner={isPartner}
          thisIsMine={thisIsMine}
          numberOfTags={numberOfTags}
        />
      )}
      {(numberOfPartners || thisIsMine) && (
        <ProfilePartners isPartner={isPartner} thisIsMine={thisIsMine} numberOfPartners={numberOfPartners} />
      )}
      {(profileStore.links?.length || thisIsMine) && (
        <ProfileLinks isPartner={isPartner} thisIsMine={thisIsMine} />
      )}
    </div>
  );
});
