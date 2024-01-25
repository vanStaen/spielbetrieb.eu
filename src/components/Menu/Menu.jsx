import React from "react";

import { Tooltip, Avatar } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";

import { adminStore } from "../../store/adminStore/adminStore";

import "./Menu.less";

export const Menu = () => {
  return (
    <div className="menu__container invertColorTheme">
      <Link to="./admin" relative="path">
        <Avatar
          src={<UserOutlined className="menu__icon" />}
          icon={adminStore.isLoading && <Spin indicator={spinIcon} />}
          className="menu__avatar"
          size={50}
        />
      </Link>
    </div>
  );
};
