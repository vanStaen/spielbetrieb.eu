import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Tag, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { pageStore } from "../../../../../../store/pageStore/pageStore";
import { userStore } from "../../../../../../store/userStore/userStore";
import { profileStore } from "../../../../../../store/profileStore/profileStore";
import { CustomSpinner } from "../../../../../../components/CustomSpinner/CustomSpinner";
import { getPictureUrl } from "../../../../../../helpers/picture/getPictureUrl";

import "./PartnerCard.less";

// TODO: add tags

export const PartnerCard = observer((props) => {
  const { id, name, avatar, description, pending, userName, suspended } = props.partner;
  const isMypartner = profileStore.id === userStore?.id;
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();

  const fetchAvatarUrl = async () => {
    const url = await getPictureUrl(`${avatar}_t`, "temp");
    const isloaded = new Promise((resolve, reject) => {
      const loadImg = new Image();
      loadImg.src = url;
      loadImg.onload = () => resolve(url);
      loadImg.onerror = (err) => reject(err);
    });
    await isloaded;
    setAvatarUrl(url);
  };

  useEffect(() => {
    fetchAvatarUrl();
  }, [avatar]);

  const handlepartnerContainerClick = () => {
    navigate(`/partner/${userName}`, { relative: "path" });
  };

  return (
    <div
      key={id}
      id={`partnerContainer${id}`}
      className={`partner__Container 
                ${pageStore.selectedTheme === "light" ? "partner__black" : "partner__white"}
            `}
      onClick={handlepartnerContainerClick}
    >
      {avatarUrl ? (
        <div className="partner__artwork">
          <img src={avatarUrl} />
        </div>
      ) : (
        <div className="partner__artworkLoading">
          <CustomSpinner />
        </div>
      )}
      <div className="partner__main">
        <div className={"partner__name"}>{name}</div>
        <div className={"partner__desc"}>{description}</div>
        {/* 
                    <div className={"partner__tags"}>
                    {tagsFormatted}
                    </div> 
                */}
      </div>

      <div className="partner__actions">
        {suspended ? <Tag className="red" bordered={false}>Suspended</Tag>
          : pending && <Tag className="lightRed" bordered={false}>Pending</Tag>}
        {isMypartner && (
          <div
            className="partner__action"
          // TODO: onClick={handleEditpartner}
          >
            <EditOutlined />
          </div>
        )}
        {(isMypartner || userStore.isAdmin) && (
          <div className="partner__action">
            <div onClick={(e) => e.stopPropagation()}>
              <Popconfirm
                title={`Archive this partner?`}
                style={{ marginRight: 8 }}
              // TODO: onConfirm={handleArchivepartner}
              >
                <DeleteOutlined className="partner__deleteLogo" />
              </Popconfirm>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
