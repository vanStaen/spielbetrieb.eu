import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../store/profileStore/profileStore";
import { ProfileFriendAvatar } from "./ProfileFriendAvatar/ProfileFriendAvatar";

import "./ProfileFriends.less";

export const ProfileFriends = observer(() => {
  const { t } = useTranslation();

  const friendsFormatted = profileStore.friends.map((friend, index) => {
    return (
      <ProfileFriendAvatar
        key={`friend${index}`}
        userName={friend.userName}
        path={friend.avatar}
        isPartner={friend.isPartner}
      />
    );
  });

  const friendsFollowers = profileStore.followers.map((follower, index) => {
    return (
      <ProfileFriendAvatar
        key={`follower${index}`}
        userName={follower.userName}
        path={follower.avatar}
        isPartner={follower.isPartner}
      />
    );
  });

  const friendsFollowed = profileStore.followed.map((followed, index) => {
    return (
      <ProfileFriendAvatar
        key={`followed${index}`}
        userName={followed.userName}
        path={followed.avatar}
        isPartner={followed.isPartner}
      />
    );
  });

  return (
    <div className="profilFriends__mainContainer">
      {!!profileStore.friends.length && !profileStore.isPartner && (
        <div className="profilFriends__container">
          <div className="profilFriends__title">
            {t("profile.friends")} ({profileStore.friends.length})
          </div>
          {friendsFormatted}
          {/* <div className="profilFriends__followersAvatar profilFriends__followersCounterContainer">
          <div className="profilFriends__followersCounter"> +8</div>
        </div> */}
        </div>
      )}
      {!!profileStore.followers.length && (
        <div className="profilFriends__container">
          <div className="profilFriends__title">
            {t("profile.followers")} ({profileStore.followers.length})
          </div>
          {friendsFollowers}
        </div>
      )}
      {!!profileStore.followed.length && !profileStore.isPartner && (
        <div className="profilFriends__container">
          <div className="profilFriends__title">
            {t("profile.following")} ({profileStore.followed.length})
          </div>
          {friendsFollowed}
        </div>
      )}
    </div>
  );
});
