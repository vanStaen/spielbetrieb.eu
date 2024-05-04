import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { notification, Spin } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../../store/userStore/userStore";
import { profileStore } from "../../../../store/profileStore/profileStore";
import { postPicture } from "../../../../helpers/picture/postPicture";
import { getPictureUrl } from "../../../../helpers/picture/getPictureUrl";
import { updateAvatar } from "./updateAvatar";

import "./Avatar.less";

export const Avatar = observer(() => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const isStranger = userStore.userName !== profileStore.userName;
  const [avatarPic, setAvatarPic] = useState(null);

  const getAvatarUrl = async (path) => {
    const url = await getPictureUrl(path, "users");
    setAvatarPic(url);
  };

  useEffect(() => {
    isStranger
      ? getAvatarUrl(profileStore.avatar)
      : getAvatarUrl(userStore.avatar);
  }, []);

  const fileSelectHandler = async (event) => {
    setIsUploading(true);
    changeAvatarSubmitHandler(event.target.files[0]);
  };

  const changeAvatarSubmitHandler = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await postPicture(file, "users");
      await updateAvatar(res.path);
      notification.open({
        duration: 5,
        message: <TitleAvatarUpdateSuccess />,
        description: <DescAvatarUpdateSuccess />,
        placement: "bottomRight",
        className: "customNotification",
      });
      userStore.setAvatar(res.path);
      getAvatarUrl(res.path);
      setIsUploading(false);
    } catch (err) {
      notification.error({
        message: t("profile.avatarUpdateFail"),
        placement: "bottomRight",
        className: "customNotification",
      });
      setIsUploading(false);
      console.log(err);
    }
  };

  return (
    <div className="avatar__container">
      {isUploading ? (
        <div className="avatar__avatar" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="avatar__avatarLoading">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div
          className="avatar__avatar"
          style={
            isStranger
              ? profileStore.avatar && {
                  backgroundImage: "url(" + avatarPic + ")",
                }
              : userStore.avatar && {
                  backgroundImage: "url(" + avatarPic + ")",
                }
          }
        >
          {isStranger
            ? !profileStore.avatar && (
                <UserOutlined className="avatar__noAvatar" />
              )
            : !userStore.avatar && (
                <UserOutlined className="avatar__noAvatar" />
              )}
          {!isStranger && (
            <div className="avatar__editAvatar">
              <form
                onSubmit={changeAvatarSubmitHandler}
                className="avatar__form"
              >
                <input
                  type="file"
                  className="avatar__inputfile"
                  name="inputfile"
                  id="file"
                  onChange={fileSelectHandler}
                />
                <label htmlFor="file">
                  <EditOutlined />
                </label>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

const TitleAvatarUpdateSuccess = () => {
  const { t } = useTranslation();
  return (
    <>
      <UserOutlined /> {t("profile.avatarUpdateSuccessTitle")}
    </>
  );
};

const DescAvatarUpdateSuccess = () => {
  const { t } = useTranslation();
  return <>{t("profile.avatarUpdateSuccess")}</>;
};
