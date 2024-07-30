import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";

import errorLogo from "../../../img/logos/errorLogo.png";
import { Notification } from "./Notification/Notification";
import { pageStore } from "../../../store/pageStore/pageStore";
import { userStore } from "../../../store/userStore/userStore";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { postAllNotificationSeen } from "./postAllNotificationSeen";

import "./Notifications.less";
import { HelpButtons } from "../../../components/HelpButtons/HelpButtons";

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

  // TODO1: Create a 'mark all as seen button in UI'
  const markedAllAsSeen = async () => {
    await postAllNotificationSeen();
    pageStore.setUnseenNotificationsCount(0);
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
    <>
      <HelpButtons />
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
              className="notification__nothingImg"
            />
            {t("notifications.noNotification")}
          </div>
        ) : (
          <>
            {!!pageStore.unseenNotificationsCount && (
              <Button
                type="primary"
                className={`notification__markAllSeen ${pageStore.selectedTheme === "dark" ? "darkColorTheme__Button" : "lightColorTheme__Button"}`}
                onClick={markedAllAsSeen}
              >
                {t("notifications.markAllSeen")}
              </Button>
            )}
            {notificationsFormated}
          </>
        )}
      </div>
    </>
  );
});
