import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Avatar, Badge, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LockOutlined,
  UnlockOutlined,
  SettingOutlined,
  UserOutlined,
  PieChartOutlined,
  LoadingOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import { userStore } from "../../store/userStore/userStore";
import { pageStore } from "../../store/pageStore/pageStore";
import { authStore } from "../../store/authStore/authStore";
import { AddToHomeScreen } from "../AddToHomeScreen/AddToHomeScreen";
import { getPictureUrl } from "../../helpers/picture/getPictureUrl";
import { ConditionalWrapper } from "../../helpers/dev/ConditionalWrapper";

import "./Menu.less";

export const Menu = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showOpenLock, setShowOpenLock] = useState(false);
  const [avatarPic, setAvatarPic] = useState(null);

  const getAvatarUrl = async (path) => {
    if (path) {
      const url = await getPictureUrl(path, "users");
      const isloaded = new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = url;
        loadImg.onload = () => resolve(url);
        loadImg.onerror = (err) => reject(err);
      });
      await isloaded;
      setAvatarPic(url);
    }
  };

  useEffect(() => {
    getAvatarUrl(userStore.avatar);
  }, [userStore.avatar]);

  useEffect(() => {
    if (pageStore.showMenu) {
      // const elementBackground = document.getElementById("silentBackground");
      const elementContainer = document.getElementById("menuContainer");
      // elementBackground.style.backdropFilter = 'blur(7px) grayscale(25%)';
      elementContainer.style.opacity = 1;
    }
  });

  const spinIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, color: "#e1cfbb", top: "-4px" }}
      spin
    />
  );

  const handleClickLogOut = () => {
    authStore.logout();
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  const handleHideMenu = () => {
    const elementBackground = document.getElementById("silentBackground");
    const elementContainer = document.getElementById("menuContainer");
    elementBackground.style.backdropFilter = "blur(0px) grayscale(0%)";
    elementContainer.style.opacity = 0;
    setTimeout(function () {
      pageStore.setShowMenu(false);
    }, 300);
  };

  const avatarClickhandle = () => {
    if (authStore.hasAccess) {
      pageStore.setShowMenu(!pageStore.showMenu);
      pageStore.setShowMenuMobile(false);
    } else {
      navigate("/login");
    }
  };

  const profileClickHandler = () => {
    userStore.setIsLoading(true);
    navigate("/profile");
  };

  const settingsClickHandler = () => {
    userStore.setIsLoading(true);
    navigate("/settings");
  };

  const notificationsClickHandler = () => {
    navigate("/notifications");
  };

  // TODO: like insta with multi, can switch from user to partner account

  return (
    <>
      <div className={`menu__containerAvatar`} onClick={avatarClickhandle}>
        <Badge
          size="small"
          count={pageStore.unseenNotificationsCount}
          offset={[-45, 45]}
        >
          <Avatar
            shape="square"
            src={
              avatarPic ? (
                <img src={avatarPic} />
              ) : (
                <UserOutlined className="menu__icon" />
              )
            }
            icon={
              userStore.isLoading && (
                <Spin className="menu__spinner" indicator={spinIcon} />
              )
            }
            className="menu__avatar"
            size={48}
          />
        </Badge>
      </div>
      {pageStore.showMenu && (
        <>
          <div
            className="menu__silentBackground"
            id="silentBackground"
            onClick={handleHideMenu}
          ></div>
          <div
            className={`menu__container ${pageStore.selectedTheme === "light" ? "lightColorTheme__Menu" : "darkColorTheme__Menu"}`}
            id="menuContainer"
          >
            <div className="link menu__element" onClick={profileClickHandler}>
              <UserOutlined style={{ position: "relative", bottom: "-2px" }} />
              &nbsp; Profile
            </div>
            <div className="menu__spacer"></div>
            <div className="link menu__element" onClick={settingsClickHandler}>
              <SettingOutlined
                style={{ position: "relative", bottom: "-2px" }}
              />
              &nbsp; Settings
            </div>
            <div className="menu__spacer"></div>
            <div
              className={
                pageStore.notificationsCount === 0
                  ? "menu__elementDisabled"
                  : "link menu__element"
              }
              onClick={notificationsClickHandler}
            >
              <ConditionalWrapper
                condition={pageStore.unseenNotificationsCount}
                wrap={(children) => (
                  <Badge dot className="menu__badgeDot">
                    {children}
                  </Badge>
                )}
              >
                <NotificationOutlined
                  style={{ position: "relative", bottom: "-2px" }}
                />
              </ConditionalWrapper>
              &nbsp; Notifications
            </div>
            <div className="menu__whiteline"></div>
            <div key="addtohomescreen">
              <AddToHomeScreen />
            </div>
            <div
              className="link menu__element"
              onMouseEnter={() => setShowOpenLock(true)}
              onMouseLeave={() => setShowOpenLock(false)}
              onClick={handleClickLogOut}
            >
              {showOpenLock ? (
                <UnlockOutlined
                  style={{ position: "relative", bottom: "-2px" }}
                />
              ) : (
                <LockOutlined
                  style={{ position: "relative", bottom: "-2px" }}
                />
              )}
              &nbsp; {t("general.logout")}
            </div>
            {userStore.isAdmin && (
              <>
                <div className="menu__whiteline"></div>
                <div className="link menu__element">
                  <Link className="link menu__link" to="/admin/">
                    <PieChartOutlined
                      style={{ position: "relative", bottom: "-2px" }}
                    />
                    &nbsp; Admin
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
});
