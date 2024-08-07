import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { profileStore } from "../../../store/profileStore/profileStore";
import { authStore } from "../../../store/authStore/authStore";
import { Avatar } from "./ProfileLeftSide/Avatar/Avatar";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { CustomError } from "../../../components/CustomError/CustomError";
import { ProfileMain } from "./ProfileMain/ProfileMain";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";
import { ProfileFriends } from "./ProfileLeftSide/ProfileFriends/ProfileFriends";
import { ProfileDetails } from "./ProfileLeftSide/ProfileDetails/ProfileDetails";
import { ProfileActions } from "./ProfileLeftSide/ProfileActions/ProfileActions";
import { Banner } from "../../../components/Banner/Banner";

import "./Profile.less";

// TODO : Translation

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
    // TODO1 : user doesnt exist
  }, [userStore.isLoading, userStore.userName, params.username]);

  useEffect(() => {
    !params.username && redirectIfNotLoggedIn();
    // TODO1 : show message if user is not loggedIn.
    // TODO1 : Check if profile can be access by !friends
  }, []);

  const thisIsMine = userStore.id === profileStore.id;

  return (
    <>
      {profileStore.suspended && (
        <Banner
          title="This profile is suspended"
          desc="This account is suspended. This profile can't be accessed anymore. Please contact us to resove this issue."
          id={"suspendedProfileBanner"}
          color="red"
        />
      )}
      <div className="profil__main">
        {profileStore.error || userStore.error ? (
          <div className="profil__spinner">
            <CustomError text={t("main.pleaseReload")} size="large" />
          </div>
        ) : profileStore.isLoading ? (
          <div className="profil__spinner">
            <CustomSpinner text={`${t("general.loading")} (User profile)`} />
          </div>
        ) : profileStore.suspended && !thisIsMine ? (
          <div className="profil__spinner">
            <CustomError text={t("main.profileSuspended")} size="large" />
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
