import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";

import { getPictureUrl } from "../../../../../../helpers/picture/getPictureUrl";
import { profileStore } from "../../../../../../store/profileStore/profileStore";

import "./ProfileFriendAvatar.less";

export const ProfileFriendAvatar = (props) => {
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const { userName, path, isPartner } = props;

  const fetchAvatarUrls = async () => {
    if (path) {
      const avatarUrl = await getPictureUrl(`${path}_t`, "users");
      setAvatar(avatarUrl);
      const isloaded = new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = avatarUrl;
        loadImg.onload = () => resolve(avatarUrl);
        loadImg.onerror = (err) => reject(err);
      });
      await isloaded;
    }
    setAvatarLoading(false);
  };

  useEffect(() => {
    fetchAvatarUrls();
  }, []);

  return (
    <Tooltip title={userName}>
      <Link
        to={`../${isPartner ? "partner" : "user"}/${userName}`}
        onClick={() => {
          profileStore.fetchProfileData(userName);
        }}
      >
        {avatarLoading ? (
          <div className="profilFriendAvatar__avatar">
            <div className="profilFriendAvatar__loader">
              <LoadingOutlined
                className="profilFriendAvatar__loaderSpinner"
                spin
              />
            </div>
          </div>
        ) : (
          <div
            className="profilFriendAvatar__avatar"
            style={{
              backgroundImage: `url(${avatar})`,
            }}
          >
            {!path && <UserOutlined className="profilFriendAvatar__noAvatar" />}
          </div>
        )}
      </Link>
    </Tooltip>
  );
};
