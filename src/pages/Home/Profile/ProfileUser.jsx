import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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

export const ProfileUser = observer(() => {
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
    const username = params.username
      ? params.username.toLowerCase()
      : userStore.userName?.toLowerCase();
    username && profileStore.fetchProfileData(username);
    // TODO : user doesnt exist
  }, [userStore.isLoading, userStore.userName, params.username]);

  useEffect(() => {
    !params.username && redirectIfNotLoggedIn();
    // TODO : check if profile can be access wihtout be loged in
    // TODO : Check if profile can be access by !friends
  }, []);

  const thisIsMine = userStore.id === profileStore.id;

  return (
    <>
      <div className="profil__main">
        {profileStore.isLoading ? (
          <div className="profil__spinner">
            <CustomSpinner text={`${t("general.loading")} (User profile)`} />
          </div>
        ) : profileStore.error ? (
          <div className="profil__spinner">
            <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
            <div className="errorText">{t("main.pleaseReload")}</div>
          </div>
        ) : (
          <>
            <div className="profil__containerLeft">
              <Avatar thisIsMine={thisIsMine} isPartner={false} />
              <ProfileDetails isPartner={false} />
              {!thisIsMine && <ProfileActions isPartner={false} />}
              <ProfileFriends thisIsMine={thisIsMine} isPartner={false} />
            </div>
            <div className="profil__containerCenter">
              <ProfileMain thisIsMine={thisIsMine} isPartner={false} />
            </div>
          </>
        )}
      </div>
      <HelpButtons />
    </>
  );
});
