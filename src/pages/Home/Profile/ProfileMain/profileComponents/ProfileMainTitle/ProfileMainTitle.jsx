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
  const {
    value,
    title,
    addEvent,
    addPhoto,
    addLink,
    addPartner,
    editable,
    showEdit,
    setShowEdit,
  } = props;
  const hasValue = value !== undefined && value > 0;
  const thisIsMe = userStore.id === profileStore.id;
  const isNotEditable = editable === false;

  const editHandler = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="profileMain__title">
      {title} {hasValue && `(${value})`}
      {!isNotEditable &&
        thisIsMe &&
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
        ) : addPhoto ? (
          <div className="profileMain__edit">
            <Tooltip title="Add a photo">
              <PlusOutlined onClick={() => console.log("addPhoto")} />
            </Tooltip>
          </div>
        ) : addPartner ? (
          <div className="profileMain__edit">
            <Tooltip title="Create a Partner page">
              <PlusOutlined onClick={editHandler} />
            </Tooltip>
          </div>
        ) : addLink ? (
          <div className="profileMain__edit">
            <Tooltip title="Add a link">
              <PlusOutlined onClick={editHandler} />
            </Tooltip>
          </div>
        ) : (
          <div className="profileMain__edit">
            <Tooltip title="Edit this">
              <EditOutlined onClick={editHandler} />
            </Tooltip>
          </div>
        ))}
    </div>
  );
});
