import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { authStore } from "../../../store/authStore/authStore";
import { Avatar } from "./ProfileLeftSide/Avatar/Avatar";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { CustomError } from "../../../components/CustomError/CustomError";
import { ProfileMain } from "./ProfileMain/ProfileMain";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";
import { ProfileFriends } from "./ProfileLeftSide/ProfileFriends/ProfileFriends";
import { ProfileDetails } from "./ProfileLeftSide/ProfileDetails/ProfileDetails";
import { ProfileActions } from "./ProfileLeftSide/ProfileActions/ProfileActions";
import { partnerStore } from "../../../store/partnerStore/partnerStore";
import { Banner } from "../../../components/Banner/Banner";

import "./Profile.less";

// TODO2: add a coverphoto (title bild)
// TODO : Translation

export const ProfilePartner = observer(() => {
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
    let username;
    if (params.username) {
      username = params.username.toLowerCase();
    } else if (userStore.partnerSelected) {
      username = userStore.partnerSelected.userName.toLowerCase();
    }
    username && partnerStore.fetchPartnerData(username, true);
    // TODO1 : Partner doesnt exist
    // TODO1 : Partner can decide if profile can be seen by loggedout users
  }, [params.username, userStore.partnerSelected]);

  const thisIsMine = partnerStore.admin.includes(userStore.id);

  // TODO: check why so many rerender
  // https://www.npmjs.com/package/@welldone-software/why-did-you-render
  // console.log('rerender');

  return (
    <>
      {partnerStore.suspended ? (
        <Banner
          title="This profile is suspended"
          desc="This partner account is suspended. This profile can't be accessed anymore.. Please contact us to resove this issue."
          id={"suspendedPartnerBanner"}
          color="red"
        />
      ) : (
        partnerStore.pending && (
          <Banner
            title="This profile is pending validation"
            desc="This partner account is being reviewed by our team."
            id={"pendingPartnerBanner"}
            color="lightRed"
          />
        )
      )}
      <div className="profil__main">
        {partnerStore.error || userStore.error ? (
          <div className="profil__spinner">
            <CustomError text={t("main.pleaseReload")} size="large" />
          </div>
        ) : partnerStore.isLoading ? (
          <div className="profil__spinner">
            <CustomSpinner text={`${t("general.loading")} (Partner profile)`} />
          </div>
        ) : partnerStore.suspended && !thisIsMine ? (
          <div className="profil__spinner">
            <CustomError text={t("main.partnerSuspended")} size="large" />
          </div>
        ) : partnerStore.pending && !thisIsMine ? (
          <div className="profil__spinner">
            <CustomError text={t("main.partnerPending")} size="large" />
          </div>
        ) : (
          <>
            <div className="profil__containerLeft">
              <Avatar isPartner={true} thisIsMine={thisIsMine} />
              <ProfileDetails isPartner={true} thisIsMine={thisIsMine} />
              {/* !thisIsMine && <ProfileActions />}
              <ProfileFriends /> */}
            </div>
            <div className="profil__containerCenter">
              <ProfileMain isPartner={true} thisIsMine={thisIsMine} />
            </div>
          </>
        )}
      </div>
      <HelpButtons />
    </>
  );
});
