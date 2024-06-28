import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { observer } from "mobx-react";
import { MehOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { profileStore } from "../../../store/profileStore/profileStore";
import { authStore } from "../../../store/authStore/authStore";
import { Avatar } from "./ProfileLeftSide/Avatar/Avatar";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { ProfileMain } from "./ProfileMain/ProfileMain";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";
import { ProfileFriends } from "./ProfileLeftSide/ProfileFriends/ProfileFriends";
import { ProfileDetails } from "./ProfileLeftSide/ProfileDetails/ProfileDetails";
import { ProfileActions } from "./ProfileLeftSide/ProfileActions/ProfileActions";

import "./Profile.less";

export const Profile = observer((props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { url } = props;

  const redirectIfNotLoggedIn = async () => {
    if (!authStore.hasAccess) {
      const hasAccess = await authStore.checkAccess();
      if (!hasAccess) {
        location.href = "../";
      }
    }
  };

  useEffect(() => {
    const username = params.username ? params.username : userStore.userName;
    username && profileStore.fetchProfileData(username);
    // TODO : user doesnt exist
  }, [userStore.isLoading, userStore.userName, params.username]);

  useEffect(() => {
    // TODO : Redirect only if own profile.
    // If params.username = true, then check profile settings
    redirectIfNotLoggedIn();
  }, []);

  useEffect(() => {
    // Redirect to partner URL if user is partner and url is user
    // or the opposite
    if (profileStore.isPartner && url === "user") {
      navigate(`/partner/${params.username}`);
    } else if (!profileStore.isPartner && url === "partner") {
      navigate(`/user/${params.username}`);
    }
  }, [profileStore.isPartner]);

  const thisIsMe = userStore.id === profileStore.id;

  return (
    <>
      <div className="profil__main">
        {profileStore.isLoading ? (
          <div className="profil__spinner">
            <CustomSpinner text={`${t("general.loading")} (Profile)`} />
          </div>
        ) : profileStore.error ? (
          <div className="profil__spinner">
            <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
            <div className="errorText">{t("main.pleaseReload")}</div>
          </div>
        ) : (
          <>
            <div className="profil__containerLeft">
              <Avatar />
              <ProfileDetails />
              {!thisIsMe && <ProfileActions />}
              <ProfileFriends />
            </div>
            <div className="profil__containerCenter">
              <ProfileMain />
            </div>
          </>
        )}
      </div>
      <HelpButtons />
    </>
  );
});
