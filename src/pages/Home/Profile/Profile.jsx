import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Spin } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { profileStore } from "../../../store/profileStore/profileStore";
import { authStore } from "../../../store/authStore/authStore";
import { Avatar } from "./Avatar/Avatar";
// import { ProfileFriends } from "./ProfileFriends/ProfileFriends";
// import { ProfileDetails } from "./ProfileDetails/ProfileDetails";
// import { ProfileActions } from "./ProfileActions/ProfileActions";
import { ProfileMain } from "./ProfileMain/ProfileMain";

import "./Profile.css";

export const Profile = observer(() => {
  const params = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const username = params.username ? params.username : userStore.userName;
    profileStore.fetchProfileData(username);
  }, [userStore.isLoading, userStore.userName]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    async () => {
      if (authStore.hasAccess === false) {
        const hasAccess = await authStore.checkAccess();
        if (hasAccess === false) {
          location.href = "../";
        }
      }
    };
  }, []);

  return (
    <>
      <div className="profil__main">
        {profileStore.isLoading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        ) : profileStore.error ? (
          <div className="spinner">
            <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
            <div className="errorText">{t("main.pleaseReload")}</div>
          </div>
        ) : (
          <>
            <div className="profil__containerLeft">
              <Avatar />
              {/*  <ProfileDetails />
              <ProfileActions /> */}
            </div>
            <div className="profil__containerCenter">
              <ProfileMain />
            </div>
            <div className="profil__containerRight">
              {/* <ProfileFriends /> */}
            </div>
          </>
        )}
      </div>
    </>
  );
});
