import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../../../store/profileStore/profileStore";
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

  const followersFormatted = profileStore.followers.map((follower, index) => {
    return (
      <ProfileFriendAvatar
        key={`follower${index}`}
        userName={follower.userName}
        path={follower.avatar}
        isPartner={follower.isPartner}
      />
    );
  });

  const followingFormatted = profileStore.following.map((following, index) => {
    return (
      <ProfileFriendAvatar
        key={`following${index}`}
        userName={following.userName}
        path={following.avatar}
        isPartner={following.isPartner}
      />
    );
  });

  return (
    <div className="profilFriends__mainContainer">
      {!!profileStore.friends.length && (
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
          {followersFormatted}
        </div>
      )}
      {!!profileStore.following.length && (
        <div className="profilFriends__container">
          <div className="profilFriends__title">
            {t("profile.following")} ({profileStore.following.length})
          </div>
          {followingFormatted}
        </div>
      )}
    </div>
  );
});
