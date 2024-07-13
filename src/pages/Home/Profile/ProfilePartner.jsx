import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { MehOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../store/userStore/userStore";
import { authStore } from "../../../store/authStore/authStore";
import { Avatar } from "./ProfileLeftSide/Avatar/Avatar";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { ProfileMain } from "./ProfileMain/ProfileMain";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";
import { ProfileFriends } from "./ProfileLeftSide/ProfileFriends/ProfileFriends";
import { ProfileDetails } from "./ProfileLeftSide/ProfileDetails/ProfileDetails";
import { ProfileActions } from "./ProfileLeftSide/ProfileActions/ProfileActions";
import { partnerStore } from "../../../store/partnerStore/partnerStore";

import "./Profile.less";

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
    const username = params.username; // ? params.username : userStore.userName;
    !username && redirectIfNotLoggedIn();
    username && partnerStore.fetchPartnerData(username, true);
    // TODO : Partner doesnt exist
  }, []);

  const thisIsMine = partnerStore.admin.includes(userStore.id);

  // TODO: check why so many rerender
  // https://www.npmjs.com/package/@welldone-software/why-did-you-render
  // console.log('rerender');

  return (
    <>
      <div className="profil__main">
        {partnerStore.isLoading ? (
          <div className="profil__spinner">
            <CustomSpinner text={`${t("general.loading")} (Partner profile)`} />
          </div>
        ) : partnerStore.error ? (
          <div className="profil__spinner">
            {/* TODO: Build error Spinner */}
            <MehOutlined style={{ fontSize: "120px", color: "#b6c8bf" }} />
            <div className="errorText">{t("main.pleaseReload")}</div>
          </div>
        ) : (
          <>
            <div className="profil__containerLeft">
              <Avatar isPartner={true} />
              <ProfileDetails isPartner={true} />
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
