import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { notification } from "antd";
import { UserOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { userStore } from "../../../../../store/userStore/userStore";
import { profileStore } from "../../../../../store/profileStore/profileStore";
import { pageStore } from "../../../../../store/pageStore/pageStore";
import { postPicture } from "../../../../../helpers/picture/postPicture";
import { getPictureUrl } from "../../../../../helpers/picture/getPictureUrl";
import { updateAvatar } from "./updateAvatar";

import "./Avatar.less";

export const Avatar = observer(() => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const isStranger = userStore.userName !== profileStore.userName;
  const [avatarPic, setAvatarPic] = useState(null);

  const getAvatarUrl = async (path) => {
    if (path) {
      const url = await getPictureUrl(path, "users");
      const isloaded = new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = url;
        loadImg.onload = () => resolve(url);
        loadImg.onerror = (err) => reject(err);
      });
      await isloaded;
      setAvatarPic(url);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAvatarUrl(profileStore.avatar);
  }, []);

  const fileSelectHandler = async (event) => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (err) {
      notification.error({
        message: t("profile.avatarUpdateFail"),
        placement: "bottomRight",
        className: "customNotification",
      });
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="avatar__container">
      {isLoading ? (
        <div className="avatar__avatar">
          <div className="avatar__avatarLoading">
            <LoadingOutlined
              style={{ fontSize: 50, color: "#e1cfbb", top: "-4px" }}
              spin
            />
          </div>
        </div>
      ) : (
        <div
          className={`avatar__avatar ${pageStore.selectedTheme === "light" ? "avatar__light" : "avatar__dark"}`}
          style={
            avatarPic && {
              backgroundImage: "url(" + avatarPic + ")",
            }
          }
        >
          {!profileStore.avatar && (
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
