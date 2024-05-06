import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { MehOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { profileStore } from "../../../store/profileStore/profileStore";
import { authStore } from "../../../store/authStore/authStore";
import { Avatar } from "./Avatar/Avatar";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { ProfileMain } from "./ProfileMain/ProfileMain";

import { ProfileFriends } from "./ProfileFriends/ProfileFriends";
// import { ProfileDetails } from "./ProfileDetails/ProfileDetails";
import { ProfileActions } from "./ProfileActions/ProfileActions";

import "./Profile.less";

export const Profile = observer(() => {
  const params = useParams();
  const { t } = useTranslation();

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
  }, [userStore.isLoading, userStore.userName]);

  useEffect(() => {
    redirectIfNotLoggedIn();
  }, []);

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
              {/* <ProfileDetails /> */}
              <ProfileActions />
            </div>
            <div className="profil__containerCenter">
              <ProfileMain />
            </div>
            <div className="profil__containerRight">
              <ProfileFriends />
            </div>
          </>
        )}
      </div>
    </>
  );
});
