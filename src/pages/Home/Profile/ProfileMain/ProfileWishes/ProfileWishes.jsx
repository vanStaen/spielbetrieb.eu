import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { profileStore } from "../../../../../store/profileStore/profileStore";

import "./ProfileWishes.less";

export const ProfileWishes = observer(() => {
  const { t } = useTranslation();
  return (
    <div className="profileWishes__container">
      <div className="profileMain__title">
        {t("profile.wishes")} ({profileStore.wishes?.length})
        <div className="profileMain__edit">
          <Tooltip title="edit">
            <EditOutlined />
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
