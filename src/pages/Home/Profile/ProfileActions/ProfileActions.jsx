import React, { useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  MailOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { profileStore } from "../../../../store/profileStore/profileStore";
import { userStore } from "../../../../store/userStore/userStore";

import { acceptFriendRequest } from "./acceptFriendRequest";
import { addFollow } from "./addFollow";
import { addFriendRequest } from "./addFriendRequest";
import { declineFriendRequest } from "./declineFriendRequest";
import { deleteFollow } from "./deleteFollow";
import { deleteFriendRequest } from "./deleteFriendRequest";
import { deleteFriendship } from "./deleteFriendship";

import "./ProfileActions.less";

export const ProfileActions = observer(() => {
  const { t } = useTranslation();

  const [isFollowing, setIsFollowing] = useState(
    userStore.following
      ? !(
          userStore.following.findIndex(
            (following) => parseInt(following._id) === profileStore._id,
          ) < 0
        )
      : false,
  );

  const [isFriend, setIsFriend] = useState(
    userStore.friends
      ? !(
          userStore.friends.findIndex(
            (friend) => parseInt(friend._id) === profileStore._id,
          ) < 0
        )
      : false,
  );

  // TODO: Check this
  const [isPending, setIsPending] = useState(
    userStore.friendrequests
      ? !(
          userStore.friendrequests.findIndex(
            (pending) => parseInt(pending.friend_id) === profileStore._id,
          ) < 0
        )
      : false,
  );

  console.log("isFollowing", isFollowing);
  console.log("isFriend", isFriend);
  console.log("isPending", isPending);

  const handleClick = async (action) => {
    try {
      if (action === "follow") {
        await addFollow(profileStore._id);
        setIsFollowing(true);
      } else if (action === "unfollow") {
        await deleteFollow(profileStore._id);
        setIsFollowing(false);
      } else if (action === "request") {
        await addFriendRequest(profileStore._id);
        setIsPending(true);
      } else if (action === "unrequest") {
        await deleteFriendRequest(profileStore._id);
        setIsPending(false);
      } else if (action === "unfriend") {
        await deleteFriendship(profileStore._id);
        setIsPending(false);
        setIsFriend(false);
      }
      profileStore.fetchProfileData(profileStore.userName, false);
    } catch (e) {
      console.log("error:", e);
    }
  };

  return (
    <>
      <div className="profil__actionContainer">
        <div className={"profil__action"}>
          <MailOutlined /> {t("profile.sendMessage")}
        </div>
        {
          // Friend/Unfriend action
          // TODO: pending
          isPending ? (
            <div
              className={"profil__action"}
              onClick={() => handleClick("unrequest")}
            >
              <UserDeleteOutlined /> {t("profile.deletePendingRequest")}
            </div>
          ) : isFriend ? (
            <div
              className={"profil__action"}
              onClick={() => handleClick("unfriend")}
            >
              <UserDeleteOutlined /> {t("profile.unfriendRequest")}
            </div>
          ) : (
            <div
              className={"profil__action"}
              onClick={() => handleClick("request")}
            >
              <UserAddOutlined /> {t("profile.sendFriendRequest")}
            </div>
          )
        }
        {
          // Follow/Unfollow action
          isFollowing ? (
            <div
              className={"profil__action"}
              onClick={() => handleClick("unfollow")}
            >
              <EyeInvisibleOutlined /> {t("profile.unfollow")}{" "}
              {profileStore.userName}
            </div>
          ) : (
            <div
              className={"profil__action"}
              onClick={() => handleClick("follow")}
            >
              <EyeOutlined /> {t("profile.follow")} {profileStore.userName}
            </div>
          )
        }
      </div>
    </>
  );
});
