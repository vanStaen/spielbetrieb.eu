import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  CameraOutlined,
  CloseOutlined,
  DeleteFilled,
  LikeOutlined,
  DislikeOutlined,
  UserAddOutlined,
  PictureOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { userStore } from "../../../../store/userStore/userStore";
import { pageStore } from "../../../../store/pageStore/pageStore";
import { deleteNotification } from "./deleteNotification";
import { addFollow } from "../../Profile/ProfileActions/addFollow";
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
  const {
    _id,
    type,
    seen,
    data,
    actionData,
    createdAt,
    mediaUrl,
    photoLinkId,
    userLinkId,
    eventLinkId,
  } = notification;

  const notFollowingYet =
    userStore.following.findIndex(
      (userFollowed) => userFollowed._id === String(userLinkId),
    ) === -1;

  const isNotFriend =
    userStore.friends.findIndex(
      (friend) => friend._id === String(userLinkId),
    ) === -1;

  const notificationAge = dayjs(createdAt).fromNow();

  const linkToUserPage = (
    <Link to={`/user/${data}`} onClick={(e) => e.stopPropagation()}>
      {data}
    </Link>
  );

  const getPicture = async () => {
    const pictureUrl = await getPictureUrl(mediaUrl, "users");
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
    getPicture();
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

  const closeNotificationHandler = (id) => {
    const element = document.getElementById(`notification${id}`);
    element.style.left = "100vw";
    setTimeout(() => {
      element.style.display = "none";
      deleteNotification(id);
      setNotificationsCount(notificationsCount - 1);
    }, 300);
  };

  const closeNotificationHandlerMobile = (id) => {
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
      const element = document.getElementById(`followback${_id}`);
      const elementMobile = document.getElementById(`followbackMobile${_id}`);
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
      // TODO: await postAcceptRequest(actionData);
      userStore.fetchUserData(false);
      const element = document.getElementById(`acceptRequest${_id}`);
      const elementMobile = document.getElementById(
        `acceptRequestMobile${_id}`,
      );
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
    if (type === 1 || type === 2 || type === 61) {
      navigate(`/user/${data}`);
    }
  };

  return (
    <div
      className="notification__subContainer"
      key={`notification${_id}`}
      id={`subContainer${_id}`}
    >
      <div className="notification__deleteButton">
        <div
          className="icon"
          onClick={() => closeNotificationHandlerMobile(_id)}
          id={`deleteButtonIcon${_id}`}
        >
          <DeleteFilled />
        </div>
      </div>
      <div
        className={`notifications__notification ${seen && "seen"}`}
        id={`notification${_id}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => onTouchEnd(_id)}
      >
        {pictureLoading ?
          <div className="notifications__leftSide">
            <LoadingOutlined spin className="notifications__leftSideSpinner" />
          </div> :
          <div
            className={"notifications__leftSide"}
            onClick={() => notificationClickHandler()}
            style={{
              background: `url(${picture}) center center / cover no-repeat`,
            }}
          ></div>}
        <div
          className="notifications__rightSide"
          onClick={() => notificationClickHandler()}
        >
          <NotificationTitle type={type} linkToUserPage={linkToUserPage} />
          {!userStore.isLoading &&
            type === 1 &&
            (isNotFriend ? (
              <div className="notification__actionsButtons">
                <Button
                  className={
                    pageStore.selectedTheme === "light"
                      ? "lightColorTheme__Button"
                      : "darkColorTheme__Button"
                  }
                  type="primary"
                  onClick={(e) => acceptRequestHandler(e)}
                >
                  Accept
                </Button>
              </div>
            ) : (
              <div className="notification__actionsButtons">
                <Button disabled type="primary">
                  Accepted
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
                  Follow Back
                </Button>
              </div>
            ) : (
              <div className="notification__actionsButtons">
                <Button type="primary" disabled>
                  Following back
                </Button>
              </div>
            ))}
          <div className="notification__icon">
            {type === 3 && <MailOutlined />}
            {type === 5 && <CameraOutlined />}
            {type === 12 && <LikeOutlined />}
            {type === 13 && <LikeOutlined />}
            {type === 14 && <PictureOutlined />}
            {type === 15 && <DislikeOutlined />}
            {type === 16 && <UserAddOutlined />}
          </div>
          <div className="notifications__date"> {notificationAge}</div>
        </div>
        <div
          className="closeDelete"
          onClick={() => closeNotificationHandler(_id)}
        >
          <CloseOutlined />
        </div>
      </div>
      <div className="notification__actionsButtonsMobile">
        {!userStore.isLoading && type === 1 && isNotFriend && (
          <div
            className="notification__actionsButtons"
            id={`acceptRequestMobile${_id}`}
          >
            <Button
              type="primary"
              className={`actionsButton ${pageStore.selectedTheme === "light" ? "lightColorTheme__Button" : "darkColorTheme__Button"}`}
              block={true}
              onClick={(e) => acceptRequestHandler(e)}
            >
              Accept
            </Button>
          </div>
        )}
        {!userStore.isLoading && type === 2 && notFollowingYet && (
          <div
            className="notification__actionsButtons"
            id={`followbackMobile${_id}`}
          >
            <Button
              type="primary"
              className={`actionsButton ${pageStore.selectedTheme === "light" ? "lightColorTheme__Button" : "darkColorTheme__Button"}`}
              block={true}
              onClick={(e) => followBackHandler(e)}
            >
              Follow Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});
