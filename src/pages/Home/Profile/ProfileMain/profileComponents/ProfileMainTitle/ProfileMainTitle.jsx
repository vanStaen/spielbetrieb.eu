import React from "react";
import { observer } from "mobx-react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

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
    showEdit,
    setShowEdit,
    thisIsMine,
  } = props;
  const hasValue = value !== undefined && value > 0;

  const editHandler = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div className="profileMain__title">
      {title} {hasValue && `(${value})`}
      {thisIsMine &&
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
