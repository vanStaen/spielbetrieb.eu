import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import {
  MailOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { profileStore } from "../../../../../store/profileStore/profileStore";
import { userStore } from "../../../../../store/userStore/userStore";

import { acceptFriendRequest } from "./acceptFriendRequest";
import { addFollow } from "./addFollow";
import { addFriendRequest } from "./addFriendRequest";
import { deleteFollow } from "./deleteFollow";
import { deleteFriendRequest } from "./deleteFriendRequest";
import { deleteFriendship } from "./deleteFriendship";
import { isRequested } from "./isRequested";

import "./ProfileActions.less";
import { authStore } from "../../../../../store/authStore/authStore";

export const ProfileActions = observer((props) => {
  // TODO : isPartner actions
  const { isPartner } = props;
  const { t } = useTranslation();

  const [isFollowing, setIsFollowing] = useState(
    userStore.following
      ? !(
          userStore.following.findIndex(
            (following) => parseInt(following.id) === profileStore.id,
          ) < 0
        )
      : false,
  );

  const [isFriend, setIsFriend] = useState(
    userStore.friends
      ? !(
          userStore.friends.findIndex(
            (friend) => parseInt(friend.id) === profileStore.id,
          ) < 0
        )
      : false,
  );

  const [isPending, setIsPending] = useState(
    userStore.friendrequests
      ? !(
          userStore.friendrequests.findIndex(
            (pending) => parseInt(pending.id) === profileStore.id,
          ) < 0
        )
      : false,
  );

  const [requested, setRequested] = useState(false);
  const fetchRequested = async () => {
    if (authStore.hasAccess) {
      const res = await isRequested(profileStore.id);
      setRequested(res);
    }
  };

  useEffect(() => {
    authStore.hasAccess && fetchRequested();
  }, []);

  const handleClick = async (action) => {
    if (authStore.hasAccess) {
      try {
        if (action === "follow") {
          await addFollow(profileStore.id);
          setIsFollowing(true);
        } else if (action === "unfollow") {
          await deleteFollow(profileStore.id);
          setIsFollowing(false);
        } else if (action === "request") {
          await addFriendRequest(profileStore.id);
          setIsPending(true);
        } else if (action === "unrequest") {
          await deleteFriendRequest(profileStore.id);
          setIsPending(false);
        } else if (action === "unfriend") {
          await deleteFriendship(profileStore.id);
          setIsPending(false);
          setIsFriend(false);
        } else if (action === "acceptrequest") {
          await acceptFriendRequest(profileStore.id);
          setIsPending(false);
          setRequested(false);
          setIsFriend(true);
        }
        profileStore.fetchProfileData(profileStore.userName, false);
      } catch (e) {
        console.log("error:", e);
      }
    }
  };

  // TODO: add message functionality

  return (
    <>
      <div className="profil__actionContainer">
        <div className={"profil__actionDisabled"}>
          <MailOutlined /> {t("profile.sendMessage")}
        </div>
        {requested ? (
          <div
            className={"profil__action"}
            onClick={() => handleClick("acceptrequest")}
          >
            <UserAddOutlined /> {t("profile.acceptfriendRequest")}
          </div>
        ) : isPending ? (
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
            className={
              authStore.hasAccess ? "profil__action" : "profil__actionDisabled"
            }
            onClick={() => handleClick("request")}
          >
            <UserAddOutlined /> {t("profile.sendFriendRequest")}
          </div>
        )}
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
              className={
                authStore.hasAccess
                  ? "profil__action"
                  : "profil__actionDisabled"
              }
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
