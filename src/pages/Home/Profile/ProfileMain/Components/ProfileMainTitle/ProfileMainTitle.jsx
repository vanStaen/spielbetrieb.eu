import React from "react";
import { observer } from "mobx-react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { userStore } from "../../../../../../store/userStore/userStore";
import { profileStore } from "../../../../../../store/profileStore/profileStore";

import "./ProfileMainTitle.less";

export const ProfileMainTitle = observer((props) => {
  const navigate = useNavigate();
  const { value, title, addEvent } = props;
  const hasValue = value !== undefined && value > 0;
  const thisIsMe = userStore._id === profileStore._id;

  return (
    <div className="profileMain__title">
      {title} {hasValue && `( ${value})`}
      {thisIsMe &&
        (addEvent ? (
          <div className="profileMain__edit">
            <Tooltip title="Add an event">
              <PlusOutlined
                onClick={() => {
                  navigate("/event/add");
                }}
              />
            </Tooltip>
          </div>
        ) : (
          <div className="profileMain__edit">
            <Tooltip title="Edit this">
              <EditOutlined />
            </Tooltip>
          </div>
        ))}
    </div>
  );
});
