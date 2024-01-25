import React from "react";

import { Tooltip, Avatar, Spin } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";

import { userStore } from "../../store/userStore/userStore";

import "./Menu.less";

export const Menu = () => {
  const { t } = useTranslation();
  const spinIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, color: "goldenrod", top: "-4px" }}
      spin
    />
  );

  const handleHideMenu = () => {
    const elementBackground = document.getElementById("silentBackground");
    //const elementContainer = document.getElementById("menuContainer");
    elementBackground.style.backdropFilter = "blur(0px) grayscale(0%)";
    //elementContainer.style.opacity = 0;
    setTimeout(function () {
      pageStore.setShowMenu(false);
    }, 300);
  };

  return (
    <>
      <div
        className="menu__container invertColorTheme"
        onClick={() => pageStore.setShowMenu(!pageStore.showMenu)}
      >
        <Avatar
          src={!userStore.isLoading && <UserOutlined className="menu__icon" />}
          icon={userStore.isLoading && <Spin indicator={spinIcon} />}
          className="menu__avatar"
          size={50}
        />
      </div>
      <div
        className="menu__silentBackground"
        id="silentBackground"
        onClick={handleHideMenu}
      ></div>
    </>
  );
};
