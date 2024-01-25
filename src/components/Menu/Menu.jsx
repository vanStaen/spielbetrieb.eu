import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Tooltip, Avatar, Spin } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LockOutlined,
  UnlockOutlined,
  SettingOutlined,
  UserOutlined,
  ReconciliationOutlined,
  HeartOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { userStore } from "../../store/userStore/userStore";
import { pageStore } from "../../store/pageStore/pageStore";
import { authStore } from "../../store/authStore/authStore";

import "./Menu.less";

export const Menu = observer(() => {
  const { t } = useTranslation();
  const [showOpenLock, setShowOpenLock] = useState(false);

  useEffect(() => {
    if (pageStore.showMenu) {
      const elementBackground = document.getElementById("silentBackground");
      const elementContainer = document.getElementById("menuContainer");
      elementBackground.style.backdropFilter = "blur(7px) grayscale(25%)";
      elementContainer.style.opacity = 1;
    }
  });

  const spinIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, color: "goldenrod", top: "-4px" }}
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

  return (
    <>
      <div
        className="menu__containerAvatar invertColorTheme"
        onClick={() => pageStore.setShowMenu(!pageStore.showMenu)}
      >
        <Avatar
          src={!userStore.isLoading && <UserOutlined className="menu__icon" />}
          icon={userStore.isLoading && <Spin indicator={spinIcon} />}
          className="menu__avatar"
          size={50}
        />
      </div>
      {pageStore.showMenu && (
        <>
          <div
            className="menu__silentBackground"
            id="silentBackground"
            onClick={handleHideMenu}
          ></div>
          <div className="menu__container invertColorTheme" id="menuContainer">
            <div
              className="link menu__element"
              onClick={() => pageStore.setShowMenu(true)}
            >
              <HeartOutlined style={{ position: "relative", bottom: "-2px" }} />
              &nbsp; Favorites
            </div>
            <div className="menu__elementDisabled">
              <UserOutlined style={{ position: "relative", bottom: "-2px" }} />
              &nbsp; Profile
            </div>
            <div className="menu__elementDisabled">
              <SettingOutlined
                style={{ position: "relative", bottom: "-2px" }}
              />
              &nbsp; Settings
            </div>
            <div className="menu__whiteline"></div>
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
              &nbsp; Logout
            </div>
            {userStore.hasAdminAccess && (
              <>
                <div className="menu__whiteline"></div>
                <div className="link menu__element">
                  <Link className="link menu__link" to="/admin/">
                    <ReconciliationOutlined
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