import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import errorLogo from "../../../img/logos/errorLogo.png";
import { Notification } from "./Notification/Notification";
import { pageStore } from "../../../store/pageStore/pageStore";
import { postNotificationSeen } from "./postNotificationSeen";
import { userStore } from "../../../store/userStore/userStore";

import "./Notifications.less";

export const Notifications = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    postNotificationSeen();
    pageStore.setUnseenNotificationsCount(0);
  }, []);

  const notificationsFormated = userStore.notifications.map(
    (notification, index) => {
      return (
        <Notification
          key={`notification${index}`}
          notification={notification}
        />
      );
    },
  );

  return (
    <div className="notifications__container">
      {userStore.notifications.length === 0 ? (
        <div className="notification__nothing">
          <img
            src={errorLogo}
            width="50px"
            className="notification__nothingImg invertColorTheme"
          />
          No notifications for now
        </div>
      ) : (
        notificationsFormated
      )}
    </div>
  );
});
