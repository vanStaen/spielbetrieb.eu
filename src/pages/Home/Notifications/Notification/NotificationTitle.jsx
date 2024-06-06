import React from "react";
import { useTranslation } from "react-i18next";

export const NotificationTitle = (props) => {
  const { t } = useTranslation();
  const { type, linkToUserPage } = props;

  switch (type) {
    case 1:
      return (
        <div className="notification__title">
          {linkToUserPage} {t("notifications.sentYouFriendRequest")}
        </div>
      );
    case 2:
      return (
        <div className="notification__title">
          {linkToUserPage} {t("notifications.startedFollowingYou")}
        </div>
      );
    case 3:
      return (
        <div className="notification__title">
          {t("notifications.youGotMailFrom")} {linkToUserPage}!
        </div>
      );
    case 11:
      return (
        <div className="notification__title">
          {linkToUserPage} {t("notifications.acceptedYourFriendRequest")}
        </div>
      );
    case 12:
      return (
        <div className="notification__title">
          {linkToUserPage} {t("notifications.declinedYourFriendRequest")}
        </div>
      );
    case 61:
      return (
        <div className="notification__title">
          {linkToUserPage} {t("notifications.addedNewProfilePicture")}
        </div>
      );
    case 62:
      return (
        <div className="notification__title">
          {linkToUserPage} {t("notifications.uploadedNewPicture")}
        </div>
      );
    default:
      console.log("Notification Type unknown!");
  }
};
