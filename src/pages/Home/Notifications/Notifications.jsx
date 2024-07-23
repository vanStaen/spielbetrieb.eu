import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import errorLogo from "../../../img/logos/errorLogo.png";
import { Notification } from "./Notification/Notification";
import { pageStore } from "../../../store/pageStore/pageStore";
import { userStore } from "../../../store/userStore/userStore";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";

import "./Notifications.less";

export const Notifications = observer(() => {
  const { t } = useTranslation();
  const [notificationsCount, setNotificationsCount] = useState(
    userStore.notifications.length,
  );

  useEffect(() => {
    setNotificationsCount(userStore.notifications.length);
  }, [userStore.notifications]);

  useEffect(() => {
    userStore.fetchUserData(false);
  }, []);

  const markedAllAsSeen = () => {
    pageStore.setUnseenNotificationsCount(0);
    // TODO1: Set all as seen
  };

  const notificationsFormated = userStore.notifications.map(
    (notification, index) => {
      return (
        <Notification
          key={`notification${index}`}
          notification={notification}
          notificationsCount={notificationsCount}
          setNotificationsCount={setNotificationsCount}
        />
      );
    },
  );

  return (
    <div className="notifications__container">
      {userStore.isLoading ? (
        <div className="notification__center">
          <CustomSpinner text={`${t("general.loading")} (Notifications)`} />
        </div>
      ) : notificationsCount === 0 ? (
        <div className="notification__center">
          <img
            src={errorLogo}
            width="50px"
            className="notification__nothingImg invertColorTheme"
          />
          {t("notifications.noNotification")}
        </div>
      ) : (
        notificationsFormated
      )}
    </div>
  );
});
