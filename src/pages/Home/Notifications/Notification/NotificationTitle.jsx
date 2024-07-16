import React from "react";
import { useTranslation } from "react-i18next";
import { nameParser } from "../../../../helpers/dev/nameParser";
import { pageStore } from "../../../../store/pageStore/pageStore";

export const NotificationTitle = (props) => {
  const { t } = useTranslation();
  const { type, linkToUserPage, data } = props;

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
    case 91:
      return (
        <div className="notification__title">
          {t("notifications.newEventPending")}
        </div>
      );
    case 92:
      return (
        <div className="notification__title">
          {t("notifications.newPartnerPending")}:{" "}
          <span className="notification__subTitle">{data}</span>
        </div>
      );
    case 93:
      return (
        <div className="notification__title">
          {t("notifications.newTagPending")}:{" "}
          <span className="notification__subTitle">
            {nameParser(data, pageStore.selectedLanguage)}
          </span>
        </div>
      );
    default:
      console.log("Notification Type unknown!");
  }
};
