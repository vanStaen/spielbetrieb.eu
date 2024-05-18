import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { Notification } from "./Notification/Notification";
import { pageStore } from "../../../store/pageStore/pageStore";
import { postNotificationsSeen } from "./postNotificationsSeen";

import "./Notifications.less";

export const Notifications = observer(() => {
  useEffect(() => {
    postNotificationsSeen();
    pageStore.setUnseenNotificationsCount(0);
  }, []);

  const notificationsFormated = pageStore.notifications.map(
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
      {pageStore.notifications.length === 0 ? (
        <div className="notification__nothing">No notification for now</div>
      ) : (
        notificationsFormated
      )}
    </div>
  );
});
