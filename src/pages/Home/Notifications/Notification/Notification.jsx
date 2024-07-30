import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { Button } from "antd";
import {
  LoadingOutlined,
  CloseOutlined,
  DeleteFilled,
  TagOutlined,
  CalendarOutlined,
  ShopOutlined,
  BugOutlined,
} from "@ant-design/icons";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { userStore } from "../../../../store/userStore/userStore";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { adminStore } from "../../../../store/adminStore/adminStore";
import { deleteNotification } from "./deleteNotification";
import { postNotificationSeen } from "./postNotificationSeen";
import { addFollow } from "../../Profile/ProfileLeftSide/ProfileActions/addFollow";
import { acceptFriendRequest } from "../../Profile/ProfileLeftSide/ProfileActions/acceptFriendRequest";
import { declineFriendRequest } from "../../Profile/ProfileLeftSide/ProfileActions/declineFriendRequest";
import { getPictureUrl } from "../../../../helpers/picture/getPictureUrl";
import { NotificationTitle } from "./NotificationTitle";

import "./Notification.less";

// the required distance between touchStart and touchEnd to be detected as a swipe
const MIN_SWIPE_DISTANCE = 20;

dayjs.extend(relativeTime);

export const Notification = observer((props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const throttling = useRef(false);
  const [pictureLoading, setPictureLoading] = useState(true);
  const [picture, setPicture] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const { notification, notificationsCount, setNotificationsCount } = props;
  const { id, type, seen, data, actionData, createdAt, mediaUrl, userLinkId } =
    notification;

  const notFollowingYet =
    userStore.following.findIndex(
      (userFollowed) => userFollowed.id === String(userLinkId),
    ) === -1;

  const isNotFriend =
    userStore.friends.findIndex(
      (friend) => friend.id === String(userLinkId),
    ) === -1;

  const notificationAge = dayjs(createdAt).fromNow();

  const linkToUserPage = (
    <Link to={`/user/${data}`} onClick={(e) => e.stopPropagation()}>
      {data}
    </Link>
  );

  const getPicture = async () => {
    const bucket = type === 92 ? "temp" : type === 99 ? "bugs" : "users";
    const pictureUrl = await getPictureUrl(mediaUrl, bucket);
    setPicture(pictureUrl);
    const isloaded = new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = pictureUrl;
      loadImg.onload = () => resolve(pictureUrl);
      loadImg.onerror = (err) => reject(err);
    });
    await isloaded;
    setPictureLoading(false);
  };

  useEffect(() => {
    mediaUrl && getPicture();
  }, [mediaUrl]);

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (id) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;
    if (throttling.current === false) {
      throttling.current = true;
      if (isRightSwipe) {
        hideMobileDeleteHandler(id);
      } else if (isLeftSwipe) {
        showMobileDeleteHandler(id);
      }
      setTimeout(() => {
        throttling.current = false;
      }, 500);
    }
  };

  const showMobileDeleteHandler = (id) => {
    const elementNotification = document.getElementById(`notification${id}`);
    const elementDeleteButtonIcon = document.getElementById(
      `deleteButtonIcon${id}`,
    );
    const newHeight = `${elementNotification.offsetHeight}px`;
    elementDeleteButtonIcon.style.color = "white";
    elementDeleteButtonIcon.style.height = newHeight;
    elementDeleteButtonIcon.style.background = "rgba(160, 0, 0, 0.5)";
    elementNotification.style.left = "-53px";
  };

  const hideMobileDeleteHandler = (id) => {
    const element = document.getElementById(`notification${id}`);
    const elementDeleteButtonIcon = document.getElementById(
      `deleteButtonIcon${id}`,
    );
    element.style.left = "0";
    setTimeout(() => {
      elementDeleteButtonIcon.style.background = "transparent";
      elementDeleteButtonIcon.style.color = "transparent";
    }, "300");
  };

  const closeNotificationHandler = async (id) => {
    if (!seen) {
      await postNotificationSeen(id);
      pageStore.setUnseenNotificationsCount(
        pageStore.unseenNotificationsCount - 1,
      );
    }
    const element = document.getElementById(`notification${id}`);
    const subContainer = document.getElementById(`subContainer${id}`);
    element.style.left = "100vw";
    setTimeout(() => {
      element.style.display = "none";
      subContainer.style.display = "none";
      deleteNotification(id);
      setNotificationsCount(notificationsCount - 1);
    }, 300);
  };

  const closeNotificationHandlerMobile = async (id) => {
    if (!seen) {
      await postNotificationSeen(id);
      pageStore.setUnseenNotificationsCount(
        pageStore.unseenNotificationsCount - 1,
      );
    }
    const subContainer = document.getElementById(`subContainer${id}`);
    subContainer.style.display = "none";
    deleteNotification(id);
    setNotificationsCount(notificationsCount - 1);
  };

  const followBackHandler = async (event) => {
    event.stopPropagation();
    try {
      await addFollow(actionData);
      userStore.fetchUserData(false);
      const element = document.getElementById(`followback${id}`);
      const elementMobile = document.getElementById(`followbackMobile${id}`);
      element.style.opacity = 0;
      elementMobile.style.opacity = 0;
      setTimeout(() => {
        elementMobile.style.display = "none";
      }, 300);
    } catch (e) {
      console.log(e);
    }
  };

  const acceptRequestHandler = async (event) => {
    event.stopPropagation();
    try {
      await acceptFriendRequest(actionData);
      userStore.fetchUserData(false);
      const element = document.getElementById(`acceptRequest${id}`);
      const elementMobile = document.getElementById(`acceptRequestMobile${id}`);
      element.style.opacity = 0;
      elementMobile.style.opacity = 0;
      setTimeout(() => {
        elementMobile.style.display = "none";
      }, 300);
    } catch (e) {
      console.log(e);
    }
  };

  const declineRequestHandler = async (event) => {
    event.stopPropagation();
    try {
      await declineFriendRequest(actionData);
      const element = document.getElementById(`acceptRequest${id}`);
      const elementMobile = document.getElementById(`acceptRequestMobile${id}`);
      element.style.opacity = 0;
      elementMobile.style.opacity = 0;
      setTimeout(() => {
        elementMobile.style.display = "none";
      }, 300);
    } catch (e) {
      console.log(e);
    }
  };

  const notificationClickHandler = async () => {
    if (!seen) {
      await postNotificationSeen(id);
      pageStore.setUnseenNotificationsCount(
        pageStore.unseenNotificationsCount - 1,
      );
    }
    if (type === 1 || type === 2 || type === 61) {
      navigate(`/user/${data}`);
    } else if (type === 91 || type === 92 || type === 93) {
      type === 91 && adminStore.setSelectedPage("events");
      type === 92 && adminStore.setSelectedPage("partners");
      type === 93 && adminStore.setSelectedPage("data");
      navigate(`/admin/`);
    }
  };

  return (
    <div
      className="notification__subContainer"
      key={`notification${id}`}
      id={`subContainer${id}`}
    >
      <div className="notification__deleteButton">
        <div
          className="icon"
          onClick={() => closeNotificationHandlerMobile(id)}
          id={`deleteButtonIcon${id}`}
        >
          <DeleteFilled />
        </div>
      </div>
      <div
        className={`notifications__notification ${seen && "seen"}`}
        id={`notification${id}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => onTouchEnd(id)}
      >
        {pictureLoading && mediaUrl ? (
          <div className="notifications__media">
            <LoadingOutlined spin className="notifications__mediaSpinner" />
          </div>
        ) : (
          <div
            className={"notifications__media"}
            onClick={() => notificationClickHandler()}
            style={{
              background: `url(${picture}) center center / cover no-repeat`,
            }}
          >
            {!mediaUrl && type === 91 && (
              <CalendarOutlined className="notifications__placeholder" />
            )}
            {!mediaUrl && type === 92 && (
              <ShopOutlined className="notifications__placeholder" />
            )}
            {!mediaUrl && type === 93 && (
              <TagOutlined className="notifications__placeholder" />
            )}
            {!mediaUrl && type === 99 && (
              <BugOutlined className="notifications__placeholder" />
            )}
          </div>
        )}
        <div
          className="notifications__text"
          onClick={() => notificationClickHandler()}
        >
          <NotificationTitle
            type={type}
            linkToUserPage={linkToUserPage}
            data={data}
          />
          <div className="notifications__date"> {notificationAge}</div>
        </div>
        {!userStore.isLoading &&
          type === 1 &&
          (isNotFriend ? (
            <div className="notification__actionsButtons">
              <div className="actionsButton">
                <Button
                  type="default"
                  className={`declineButton`}
                  onClick={(e) => {
                    declineRequestHandler(e);
                    closeNotificationHandler(id);
                  }}
                >
                  {t("notifications.decline")}
                </Button>
              </div>
              <div className="actionsButton">
                <Button
                  className={
                    pageStore.selectedTheme === "light"
                      ? "lightColorTheme__Button"
                      : "darkColorTheme__Button"
                  }
                  type="primary"
                  onClick={(e) => acceptRequestHandler(e)}
                >
                  {t("notifications.accept")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="notification__actionsButtons">
              <Button disabled type="primary">
                {t("notifications.accepted")}
              </Button>
            </div>
          ))}
        {!userStore.isLoading &&
          type === 2 &&
          (notFollowingYet ? (
            <div className="notification__actionsButtons">
              <Button
                className={
                  pageStore.selectedTheme === "light"
                    ? "lightColorTheme__Button"
                    : "darkColorTheme__Button"
                }
                type="primary"
                onClick={(e) => followBackHandler(e)}
              >
                {t("notifications.followBack")}
              </Button>
            </div>
          ) : (
            <div className="notification__actionsButtons">
              <Button type="primary" disabled>
                {t("notifications.followingBack")}
              </Button>
            </div>
          ))}
        <div
          className="closeDelete"
          onClick={() => closeNotificationHandler(id)}
        >
          <CloseOutlined />
        </div>
      </div>
      {!userStore.isLoading && type === 1 && isNotFriend && (
        <div
          className="notification__actionsButtonsDoubleMobile"
          id={`acceptRequestMobile${id}`}
        >
          <Button
            type="default"
            className={`actionsButton declineButton`}
            block={true}
            onClick={(e) => {
              declineRequestHandler(e);
              closeNotificationHandlerMobile(id);
            }}
          >
            {t("notifications.decline")}
          </Button>

          <Button
            type="primary"
            className={`actionsButton ${pageStore.selectedTheme === "light" ? "lightColorTheme__Button" : "darkColorTheme__Button"}`}
            block={true}
            onClick={(e) => acceptRequestHandler(e)}
          >
            {t("notifications.accept")}
          </Button>
        </div>
      )}
      {!userStore.isLoading && type === 2 && notFollowingYet && (
        <div
          className="notification__actionsButtonsMobile"
          id={`followbackMobile${id}`}
        >
          <Button
            type="primary"
            block={true}
            className={`actionsButton ${pageStore.selectedTheme === "light" ? "lightColorTheme__Button" : "darkColorTheme__Button"}`}
            onClick={(e) => followBackHandler(e)}
          >
            {t("notifications.followBack")}
          </Button>
        </div>
      )}
    </div>
  );
});
